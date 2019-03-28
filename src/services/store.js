const Store = require('../models/store');
const BaseService = require('./base');
const { raw } = require('objection');

class StoreService extends BaseService {
	async getStores(
		page = 1,
		pageSize = 10,
		search = '',
		filterCuisine = 0,
		getOnlyOperating = true,
		currentLocation
	) {
		const stores = await Store.query()
			.skipUndefined()
			.where('is_deleted', false)
			.eager('brand.[promotionCodes]')
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('is_operating', true);
				}
				if (search) {
					queryBuilder
						.where(raw(`LOWER(name) like '%${search.toLowerCase()}%'`))
						.orWhereIn(
							'brand_id',
							raw(
								`SELECT id FROM brand WHERE LOWER(name) LIKE '%${search.toLowerCase()}%'`
							)
						);
				}
				if (filterCuisine) {
					queryBuilder.mergeEager('brand.[foods]');
				}
				queryBuilder.select(
					raw(
						'*, ST_X(location::geometry) as latitude, ST_Y(location::geometry) as longitude'
					)
				);
				const { longitude, latitude } = { ...currentLocation };
				if (longitude && latitude) {
					queryBuilder.orderByRaw(
						`ST_Distance((SELECT ST_GeographyFromText('SRID=4326;POINT(${longitude} ${latitude})')), location), id`
					);
				} else {
					queryBuilder.orderBy('id');
				}
			})
			.modifyEager('brand', builder =>
				builder.modifyEager('promotionCodes', b =>
					b.where('promotion_code.is_deleted', false)
				)
			);
		let filteredStores = stores;
		if (filterCuisine) {
			filteredStores = stores.filter(store => {
				if (store.brand) {
					const foods = store.brand.foods;
					const hasCuisine = foods.reduce(
						(prev, curr) => prev || curr.typeId === parseInt(filterCuisine),
						false
					);
					return hasCuisine;
				}
				return true;
			});
			filteredStores.forEach(store => {
				if (store.brand) {
					delete store.brand.foods;
				}
			});
		}
		const offset = (page - 1) * pageSize;
		return filteredStores.slice(offset, offset + pageSize);
	}
	async getStoresByBrand(id, getOnlyOperating = true) {
		return await Store.query()
			.skipUndefined()
			.where('brand_id', id)
			.andWhere('is_deleted', false)
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('is_operating', true);
				}
				queryBuilder.select(
					raw(
						'*, ST_X(location::geometry) as latitude, ST_Y(location::geometry) as longitude'
					)
				);
			})
			.orderBy('id');
	}
	async getStoreById(id, getOnlyOperating = true) {
		return await Store.query()
			.skipUndefined()
			.where('id', id)
			.modify(queryBuilder => {
				if (getOnlyOperating) {
					queryBuilder.andWhere('store.is_operating', true);
				}
				queryBuilder.select(
					raw(
						'*, ST_X(location::geometry) as latitude, ST_Y(location::geometry) as longitude'
					)
				);
			})
			.andWhere('store.is_deleted', false)
			.eager('[employees, brand.[promotionCodes]]')
			.modifyEager('brand', builder =>
				builder.modifyEager('promotionCodes', b => b.where('is_deleted', false))
			)
			.first();
	}
	async createStore(store) {
		return await Store.query()
			.insert(store)
			.returning('id');
	}
	async updateStore(id, store) {
		return await Store.query().patchAndFetchById(id, store);
	}
	async deleteStore(id) {
		return await Store.query()
			.patch({
				isDeleted: true
			})
			.where('id', id);
	}
}

module.exports = StoreService;
