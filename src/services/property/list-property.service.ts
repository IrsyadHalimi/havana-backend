import {
  create,
  findPropertyById,
  findPropertyBySlug,
  findPropertyCategory,
  findAllProperties,
  countProperties
} from "../../repositories/property/property.repository";

import {
  getPagination
} from "../../utils/query/pagination";

import {
  paginatedResponse
} from "../../utils/query/paginated-response";


export const listProperty = () => async (
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
    await findAllProperties({
      tenantId,
      search: query.search,
      skip,
      take,
      sort: query.sort,
      order: query.order
    });

  const total =
    await countProperties(
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