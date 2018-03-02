import { Map, OrderedMap } from "immutable"

export function generateId() {
  return Date.now()
}

export function fbDataEntities(data, RecordModel = Map) {
  return new OrderedMap(data).mapEntries(([uid, value]) => [
    uid,
    new RecordModel(value).set("uid", uid)
  ])
}
