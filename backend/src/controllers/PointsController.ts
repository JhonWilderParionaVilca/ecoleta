import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController {
  async create(req: Request, res: Response) {
    const trx = await knex.transaction();
    // TODO: change name uf departament and city to province
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
      image: req.file.filename,
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

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            item_id,
            point_id: insertedIds[0],
          };
        });
      await trx("points_items").insert(pointItems);

      await trx.commit();

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

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.0.21:3333/uploads/${point.image}`,
      };
    });
    res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res
        .status(400)
        .json({ message: "Punto de recolección no encontrado!!" });
    }
    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.21:3333/uploads/${point.image}`,
    };

    const items = await knex("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return res.json({ point: serializedPoint, items });
  }
}

export default new PointsController();
