import {
  createPropertyRoom,
  findPropertyRoomById,
  findAllPropertyRooms,
  countPropertyRooms
} from "../../repositories/room/room.repository";

import {
  getPagination
} from "../../utils/query/pagination";

import {
  paginatedResponse
} from "../../utils/query/paginated-response";


export const listRoom = () => async (
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

  let search = query.search;
  const data =
    await findAllPropertyRooms({
      propertyId,
      tenantId,
      skip,
      take,
      search
    });

  const total =
    await countPropertyRooms(
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