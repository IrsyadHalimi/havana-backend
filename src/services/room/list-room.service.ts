import {
  RoomRepository
} from "../../repositories/room/room.repository";

import {
  getPagination
} from "../../utils/query/pagination";

import {
  paginatedResponse
} from "../../utils/query/paginated-response";


export const listRoom = (
  repository = RoomRepository()
) => async (
  tenantId: string,
  propertyId: string,
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
    await repository.findAllByProperty(
      propertyId,
      tenantId,
      skip,
      take,
      query.search
    );

  const total =
    await repository.countByProperty(
      propertyId,
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