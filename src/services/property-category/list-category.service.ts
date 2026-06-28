import {
  findAllPropertyCategories,
  countPropertyCategories
} from "../../repositories/property-category/property-category.repository";

import {
  getPagination
} from "../../utils/pagination";

import {
  paginatedResponse
} from "../../utils/paginated-reponse";


export const listCategory = () => async (
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
    await findAllPropertyCategories({
      tenantId,
      search: query.search,
      sort: query.sort,
      order: query.order,
      skip,
      take
    });

  const total =
    await countPropertyCategories(
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