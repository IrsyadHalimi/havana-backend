import {
  PropertyRepository
} from "../../repositories/property/property.repository";

import {
  getPagination
} from "../../utils/query/pagination";

import {
  paginatedResponse
} from "../../utils/query/paginated-response";


export const listProperty = (
  repository = PropertyRepository()
) => async (
  tenantId: string,
  query: any
) => {

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
    await repository.findAll({
      tenantId,
      search: query.search,
      skip,
      take,
      sort: query.sort,
      order: query.order
    });

  const total =
    await repository.count(
      tenantId,
      query.search
    );

  return paginatedResponse(
    data,
    total,
    page,
    limit
  );
};