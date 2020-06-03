import Knex from "knex";

export async function seed(knex: Knex) {
  await knex.table("items").insert([
    { title: "lámparas", image: "lampadas.svg" },
    { title: "Pilas y Baterias", image: "baterias.svg" },
    { title: "Papeles", image: "papeis-papelao.svg" },
    { title: "Residuos Electrónicos", image: "eletronicos.svg" },
    { title: "Residuos Orgánicos", image: "organicos.svg" },
    { title: "Aceite de Cocina", image: "oleo.svg" },
  ]);
}
