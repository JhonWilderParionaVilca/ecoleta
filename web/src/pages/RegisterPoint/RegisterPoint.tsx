import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import axios from "axios";

import logo from "../../assets/logo.svg";

import api from "../../services/api";
import { Dropzone } from "../../components";

import "./CreatePoint.css";

//interfaces
interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface DepartamentResponse {
  descripcion: string;
}

interface ProvinciaResponse {
  descripcion: string;
}

//component
const RegisterPoint = () => {
  const [items, setItem] = useState<Item[]>([]);
  const [departaments, setDepartaments] = useState<String[]>([]);
  const [provinces, setProvinces] = useState<String[]>([]);

  const [initialPositionMap, setInitialPositionMap] = useState<
    [number, number]
  >([0, 0]);

  const [selectedDepartamentId, setSelectedDepartamentId] = useState("0");
  const [selectedDepartament, setSelectedDepartament] = useState("0");
  const [selectedProvince, setSelectedProvince] = useState("0");
  const [selectedMapPosition, setSelectedMapPosition] = useState<
    [number, number]
  >([0, 0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const history = useHistory();

  useEffect(() => {
    api.get("/items").then((res) => {
      setItem(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<DepartamentResponse[]>(
        "http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarDepartamentosPorVersion.htm?llaveProyectoPK=5-1"
      )
      .then((res) => {
        const departament = res.data.map((dep) => dep.descripcion);
        setDepartaments(departament);
      });
  }, []);

  useEffect(() => {
    if (selectedDepartamentId === "0") {
      return setProvinces([]);
    }

    axios
      .get<ProvinciaResponse[]>(
        `http://webinei.inei.gob.pe:8080/sisconcode/ubigeo/buscarProvinciasPorVersion.htm?llaveProyectoPK=5-1&departamentoId=${selectedDepartamentId}`
      )
      .then((res) => {
        const province = res.data.map((prov) => prov.descripcion);
        setProvinces(province);
      });
  }, [selectedDepartamentId]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPositionMap([latitude, longitude]);
      setSelectedMapPosition([latitude, longitude]);
    });
  }, []);

  const handlerSelectedDepartamentId = (e: ChangeEvent<HTMLSelectElement>) => {
    let departament = e.target.value;
    let index = e.target.selectedIndex;
    let nameDepartament = e.target.options[index].text;
    setSelectedDepartamentId(departament);
    setSelectedDepartament(nameDepartament.trim());
  };

  const handlerSelectedProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
  };

  const handlerMapClick = (e: LeafletMouseEvent) => {
    setSelectedMapPosition([e.latlng.lat, e.latlng.lng]);
  };

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlerSelectedItems = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      return setSelectedItems(filteredItems);
    }

    return setSelectedItems([...selectedItems, id]);
  };

  const handlerSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedDepartament;
    const city = selectedProvince;
    const [latitude, longitude] = selectedMapPosition;
    const items = selectedItems;

    const data = new FormData();

    data.append("name", name.trim());
    data.append("email", email.trim());
    data.append("whatsapp", whatsapp.trim());
    data.append("uf", uf);
    data.append("city", city.trim());
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", items.join(","));

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      await api.post("/points", data);
      alert("Punto de recolección creado satisfactoriamente");
      history.push("/");
    } catch (error) {
      alert("ocurrio un error");
      console.error(error);
    }
  };

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="logo de Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Volver a inicio
        </Link>
      </header>

      <form onSubmit={handlerSubmit}>
        <h1>Registro de un punto de recolección</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Datos</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nombre de la entidad</label>
            <input
              required
              onChange={handlerInputChange}
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email de la entidad</label>
              <input
                required
                onChange={handlerInputChange}
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp de la entidad</label>
              <input
                required
                onChange={handlerInputChange}
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Dirección</h2>
            <span>Marque una posición en el mapa</span>
          </legend>

          <Map
            center={initialPositionMap}
            zoom={6.25}
            onclick={handlerMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedMapPosition}></Marker>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Departamento</label>
              <select
                name="uf"
                id="uf"
                value={selectedDepartamentId}
                onChange={handlerSelectedDepartamentId}
              >
                <option value="0">Seleccione un Departamento</option>
                {departaments.map((dep) => (
                  <option
                    key={dep.split(" ").shift()}
                    value={dep.split(" ").shift()}
                  >
                    {dep.split(" ").slice(1).join(" ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Provincia</label>
              <select
                name="city"
                id="city"
                value={selectedProvince}
                onChange={handlerSelectedProvince}
              >
                <option value="0">Seleccione una Provincia</option>
                {provinces.map((prov) => {
                  return (
                    <option
                      key={prov.split(" ").shift()}
                      value={prov.split(" ").slice(1).join(" ")}
                    >
                      {prov.split(" ").slice(1).join(" ")}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Items de Recolección</h2>
            <span>Seleccione algunos item</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handlerSelectedItems(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span> {item.title} </span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Registrar Punto de Recolección</button>
      </form>
    </div>
  );
};

export default RegisterPoint;
