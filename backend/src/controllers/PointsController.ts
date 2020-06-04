import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController {
  async create(req: Request, res: Response) {
    const trx = await knex.transaction();
    // TODO: CAMBIAR NOMBRE DE UF A DEPARTAMENTOS Y CITY A PROVINCIAS
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const point = {
      image: "image example",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    try {
      const insertedIds = await trx("points").insert(point);
      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id: insertedIds[0],
        };
      });
      await trx("points_items").insert(pointItems);

      await trx.commit();

      // FIXME: Siempre guarda aunque el item_id no exista

      return res.json({
        point_id: insertedIds[0],
        ...point,
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({ message: error });
    }
  }

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parseItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("points_items", "points.id", "=", "points_items.point_id")
      .whereIn("points_items.item_id", parseItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res
        .status(400)
        .json({ message: "Punto de recolección no encontrado!!" });
    }

    const items = await knex("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return res.json({ point, items });
  }
}

export default new PointsController();
