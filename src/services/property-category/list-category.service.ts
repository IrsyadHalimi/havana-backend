
import {
  PropertyCategoryRepository
}
from "../../repositories/property-category/property-category.repository";

import {
  getPagination
}
from "../../utils/pagination";

import {
  paginatedResponse
}
from "../../utils/paginated-reponse";

export class ListCategoryService {

  constructor(
    private repository =
      new PropertyCategoryRepository()
  ) {}

  async execute(
    tenantId: string,
    query: any
  ) {

    const page =
      Number(query.page || 1);

    const limit =
      Number(query.limit || 10);

    const {
      skip,
      take
    } = getPagination(
      page,
      limit
    );

    const data =
      await this.repository.findAll({
        tenantId,
        search: query.search,
        sort: query.sort,
        order: query.order,
        skip,
        take
      });

    const total =
      await this.repository.count(
        tenantId,
        query.search
      );

    return paginatedResponse(
      data,
      total,
      page,
      limit
    );
  }
}