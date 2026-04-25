import mongoose from "mongoose";
import ParentSection from "./src/Models/parentSection.js";
import dotenv from "dotenv";
dotenv.config();

const listaDeSecciones = [
  "Presencia de Ciudad Maderas",
  "Oficinas regionales",
  "Onboarding",
  "Apartados y caja",
  "Sustitución de recibos de pago",
  "Autorizaciones por correo",
  "Cuentas para depositar",
  "Problemas en la cuenta Bajío",
  "Estatus en el sistema de contratación",
  "Ingreso de prórrogas",
  "Prórrogas",
  "Ingreso de expediente",
  "Depósito de seriedad (pdf descargable)",
  "Documentación de persona moral",
  "Tabla de plazo",
  "Identificación del cliente",
  "Comprobante de domicilio",
  "Recibo de apartado",
  "Firma del contrato",
  "Inicio de mensualidad",
  "CRM y corridas",
  "Cómo vender con el precio de USA",
  "Proceso para contratos digitales",
  "Reglamento de comisiones USA",
  "Calendario de comisiones USA",
  "Calendario de comisiones MX",
  "Esquema de comisiones USA",
  "Esquema de comisiones MX",
  "Autorizaciones a DG",
  "Reglamento de ventas",
  "Apoyo económico a coordinadores de venta",
  "Multas y penalizaciones",
  "Metas para viajes",
  "Devoluciones de apartados",
  "Reglamento para visita a desarrollos",
  "Manual del cliente",
  "Customer Manual",
  "Proceso de contratación FV",
  "Proceso de contratación FV USA",
  "Proceso de bajas",
  "Política de correos electrónicos",
  "RD y monedero electrónico",
  "Modelos de casas",
];

const sembrarBaseDeDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB. Iniciando siembra...");

    let contador = 0;

    for (const nombre of listaDeSecciones) {
      await ParentSection.findOneAndUpdate(
        { name: nombre },
        { name: nombre },
        { upsert: true, new: true },
      );
      console.log(`Guardada: ${nombre}`);
      contador++;
    }

    console.log(`\nListo. ${contador} secciones padre guardadas.`);
    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar:", error);
    process.exit(1);
  }
};

sembrarBaseDeDatos();
