import { Injectable } from '@angular/core';

@Injectable()
export class DivisionPoliticaService {

  constructor() { }

  getDepartamentos() {
    const departamentos = [
        {
            id: 0,
            nombre: "ATLANTIDA",
            municipios: [
                { valor: 0, etiqueta: "LA CEIBA" },
                { valor: 1, etiqueta: "EL PORVENIR" },
                { valor: 2, etiqueta: "ESPARTA" },
                { valor: 3, etiqueta: "JUTIAPA" },
                { valor: 4, etiqueta: "LA MASICA" },
                { valor: 5, etiqueta: "SAN FRANCISCO" },
                { valor: 6, etiqueta: "TELA" },
                { valor: 7, etiqueta: "ARIZONA" }
            ]
        },
        {
            id: 1,
            nombre: "COLON",
            municipios: [
                { valor: 0, etiqueta: "TRUJILLO" },
                { valor: 1, etiqueta: "BALFATE" },
                { valor: 2, etiqueta: "IRIONA" },
                { valor: 3, etiqueta: "LIMON" },
                { valor: 4, etiqueta: "SABA" },
                { valor: 5, etiqueta: "SANTA FE" },
                { valor: 6, etiqueta: "SANTA ROSA AGUAN" },
                { valor: 7, etiqueta: "SONAGUERA" },
                { valor: 8, etiqueta: "TOCOA" },
                { valor: 9, etiqueta: "BONITO ORIENTAL" }
            ]
        },
        {
            id: 2,
            nombre: "COMAYAGUA",
            municipios: [
                { valor: 0, etiqueta: "COMAYAGUA" },
                { valor: 1, etiqueta: "AJUTERIQUE" },
                { valor: 2, etiqueta: "EL ROSARIO" },
                { valor: 3, etiqueta: "ESQUIAS" },
                { valor: 4, etiqueta: "HUMUYA" },
                { valor: 5, etiqueta: "LA LIBERTAD" },
                { valor: 6, etiqueta: "LAMANI" },
                { valor: 7, etiqueta: "LA TRINIDAD" },
                { valor: 8, etiqueta: "LEJAMANI" },
                { valor: 9, etiqueta: "MEAMBAR" },
                { valor: 10, etiqueta: "MINAS DE ORO" },
                { valor: 11, etiqueta: "OJOS DE AGUA" },
                { valor: 12, etiqueta: "SAN JERONIMO" },
                { valor: 13, etiqueta: "SAN JOSE DE COMAYAGUA" },
                { valor: 14, etiqueta: "SAN JOSE DEL POTRERO" },
                { valor: 15, etiqueta: "SAN LUIS" },
                { valor: 16, etiqueta: "SAN SEBASTIAN" },
                { valor: 17, etiqueta: "SIGUATEPEQUE" },
                { valor: 18, etiqueta: "VILLA DE SAN ANTONIO" },
                { valor: 19, etiqueta: "LAS LAJAS" },
                { valor: 20, etiqueta: "TAULABE" }
            ]
        },
        {
            id: 3,
            nombre: "COPAN",
            municipios: [
                { valor: 0, etiqueta: "SANTA ROSA DE COPAN" },
                { valor: 1, etiqueta: "CABA\u00d1AS" },
                { valor: 2, etiqueta: "CONCEPCION" },
                { valor: 3, etiqueta: "COPAN RUINAS" },
                { valor: 4, etiqueta: "CORQUIN" },
                { valor: 5, etiqueta: "CUCUYAGUA" },
                { valor: 6, etiqueta: "DOLORES" },
                { valor: 7, etiqueta: "DULCE NOMBRE" },
                { valor: 8, etiqueta: "EL PARAISO" },
                { valor: 9, etiqueta: "FLORIDA" },
                { valor: 10, etiqueta: "LA JIGUA" },
                { valor: 11, etiqueta: "LA UNION" },
                { valor: 12, etiqueta: "NUEVA ARCADIA" },
                { valor: 13, etiqueta: "SAN AGUSTIN" },
                { valor: 14, etiqueta: "SAN ANTONIO" },
                { valor: 15, etiqueta: "SAN JERONIMO" },
                { valor: 16, etiqueta: "SAN JOSE" },
                { valor: 17, etiqueta: "SAN JUAN DE OPOA" },
                { valor: 18, etiqueta: "SAN NICOLAS" },
                { valor: 19, etiqueta: "SAN PEDRO" },
                { valor: 20, etiqueta: "SANTA RITA" },
                { valor: 21, etiqueta: "TRINIDAD" },
                { valor: 22, etiqueta: "VERACRUZ" }
            ]
        },
        {
            id: 4,
            nombre: "CORTES",
            municipios: [
                { valor: 0, etiqueta: "SAN PEDRO SULA" },
                { valor: 1, etiqueta: "CHOLOMA" },
                { valor: 2, etiqueta: "OMOA" },
                { valor: 3, etiqueta: "PIMIENTA" },
                { valor: 4, etiqueta: "POTRERILLOS" },
                { valor: 5, etiqueta: "PUERTO CORTES" },
                { valor: 6, etiqueta: "SAN ANTONIO DE CORTES" },
                { valor: 7, etiqueta: "SAN FRANCISCO DE YOJOA" },
                { valor: 8, etiqueta: "SAN MANUEL" },
                { valor: 9, etiqueta: "SANTA CRUZ DE YOJOA" },
                { valor: 10, etiqueta: "VILLANUEVA" },
                { valor: 11, etiqueta: "LA LIMA" }
            ]
        },
        {
            id: 5,
            nombre: "CHOLUTECA",
            municipios: [
                { valor: 0, etiqueta: "CHOLUTECA" },
                { valor: 1, etiqueta: "APACILAGUA" },
                { valor: 2, etiqueta: "CONCEPCION DE MARIA" },
                { valor: 3, etiqueta: "DUYURE" },
                { valor: 4, etiqueta: "EL CORPUS" },
                { valor: 5, etiqueta: "EL TRIUNFO" },
                { valor: 6, etiqueta: "MARCOVIA" },
                { valor: 7, etiqueta: "MOROLICA" },
                { valor: 8, etiqueta: "NAMASIGUE" },
                { valor: 9, etiqueta: "OROCUINA" },
                { valor: 10, etiqueta: "PESPIRE" },
                { valor: 11, etiqueta: "SAN ANTONIO DE FLORES" },
                { valor: 12, etiqueta: "SAN ISIDRO" },
                { valor: 13, etiqueta: "SAN JOSE" },
                { valor: 14, etiqueta: "SAN MARCOS DE COLON" },
                { valor: 15, etiqueta: "SANTA ANA DE YUSGUARE" }
            ]
        },
        {
            id: 6,
            nombre: "EL PARAISO",
            municipios: [
                { valor: 0, etiqueta: "YUSCARAN" },
                { valor: 1, etiqueta: "ALAUCA" },
                { valor: 2, etiqueta: "DANLI" },
                { valor: 3, etiqueta: "EL PARAISO" },
                { valor: 4, etiqueta: "GUINOPE" },
                { valor: 5, etiqueta: "JACALEAPA" },
                { valor: 6, etiqueta: "LIURE" },
                { valor: 7, etiqueta: "MOROCELI" },
                { valor: 8, etiqueta: "OROPOLI" },
                { valor: 9, etiqueta: "POTRERILLOS" },
                { valor: 10, etiqueta: "SAN ANTONIO DE FLORES" },
                { valor: 11, etiqueta: "SAN LUCAS" },
                { valor: 12, etiqueta: "SAN MATIAS" },
                { valor: 13, etiqueta: "SOLEDAD" },
                { valor: 14, etiqueta: "TEUPASENTI" },
                { valor: 15, etiqueta: "TEXIGUAT" },
                { valor: 16, etiqueta: "VADO ANCHO" },
                { valor: 17, etiqueta: "YAUYUPE" },
                { valor: 18, etiqueta: "TROJES" }
            ]
        },
        {
            id: 7,
            nombre: "FRANCISCO MORAZAN",
            municipios: [
                { valor: 0, etiqueta: "DISTRITO CENTRAL" },
                { valor: 1, etiqueta: "ALUBAREN" },
                { valor: 2, etiqueta: "CEDROS" },
                { valor: 3, etiqueta: "CURAREN" },
                { valor: 4, etiqueta: "EL PORVENIR" },
                { valor: 5, etiqueta: "GUAIMACA" },
                { valor: 6, etiqueta: "LA LIBERTAD" },
                { valor: 7, etiqueta: "LA VENTA" },
                { valor: 8, etiqueta: "LEPATERIQUE" },
                { valor: 9, etiqueta: "MARAITA" },
                { valor: 10, etiqueta: "MARALE" },
                { valor: 11, etiqueta: "NUEVA ARMENIA" },
                { valor: 12, etiqueta: "OJOJONA" },
                { valor: 13, etiqueta: "ORICA" },
                { valor: 14, etiqueta: "REITOCA" },
                { valor: 15, etiqueta: "SABANAGRANDE" },
                { valor: 16, etiqueta: "SAN ANTONIO DE ORIENTE" },
                { valor: 17, etiqueta: "SAN BUENAVENTURA" },
                { valor: 18, etiqueta: "SAN IGNACIO" },
                { valor: 19, etiqueta: "CANTARRANAS" },
                { valor: 20, etiqueta: "SAN MIGUELITO" },
                { valor: 21, etiqueta: "SANTA ANA" },
                { valor: 22, etiqueta: "SANTA LUCIA" },
                { valor: 23, etiqueta: "TALANGA" },
                { valor: 24, etiqueta: "TATUMBLA" },
                { valor: 25, etiqueta: "VALLE DE ANGELES" },
                { valor: 26, etiqueta: "VILLA SAN FRANCISCO" },
                { valor: 27, etiqueta: "VALLECILLOS" }
            ]
        },
        {
            id: 8,
            nombre: "GRACIAS A DIOS",
            municipios: [
                { valor: 0, etiqueta: "PUERTO LEMPIRA" },
                { valor: 1, etiqueta: "BRUS LAGUNA" },
                { valor: 2, etiqueta: "AHUAS" },
                { valor: 3, etiqueta: "JUAN FRANCISCO BULNES" },
                { valor: 4, etiqueta: "VILLEDA MORALES" },
                { valor: 5, etiqueta: "WAMPUSIRPI" }
            ]
        },
        {
            id: 9,
            nombre: "INTIBUCA",
            municipios: [
                { valor: 0, etiqueta: "LA ESPERANZA" },
                { valor: 1, etiqueta: "CAMASCA" },
                { valor: 2, etiqueta: "COLOMONCAGUA" },
                { valor: 3, etiqueta: "CONCEPCION" },
                { valor: 4, etiqueta: "DOLORES" },
                { valor: 5, etiqueta: "INTIBUCA" },
                { valor: 6, etiqueta: "JESUS DE OTORO" },
                { valor: 7, etiqueta: "MAGDALENA" },
                { valor: 8, etiqueta: "MASAGUARA" },
                { valor: 9, etiqueta: "SAN ANTONIO" },
                { valor: 10, etiqueta: "SAN ISIDRO" },
                { valor: 11, etiqueta: "SAN JUAN" },
                { valor: 12, etiqueta: "SAN MARCOS SIERRA" },
                { valor: 13, etiqueta: "SAN MIGUELITO" },
                { valor: 14, etiqueta: "SANTA LUCIA" },
                { valor: 15, etiqueta: "YAMARANGUILA" },
                { valor: 16, etiqueta: "SAN FRANCISCO DE OPALACA" }
            ]
        },
        {
            id: 10,
            nombre: "ISLAS DE LA BAHIA",
            municipios: [
                { valor: 0, "name": "ROATAN" },
                { valor: 1, "name": "GUANAJA" },
                { valor: 2, "name": "JOSE SANTOS GUARDIOLA" },
                { valor: 3, "name": "UTILA" }
            ]
        },
        {
            id: 11,
            nombre: "LA PAZ",
            municipios: [
                { valor: 0, etiqueta: "LA PAZ" },
                { valor: 1, etiqueta: "AGUANQUETERIQUE" },
                { valor: 2, etiqueta: "CABA\u00d1AS" },
                { valor: 3, etiqueta: "CANE" },
                { valor: 4, etiqueta: "CHINACLA" },
                { valor: 5, etiqueta: "GUAJIQUIRO" },
                { valor: 6, etiqueta: "LAUTERIQUE" },
                { valor: 7, etiqueta: "MARCALA" },
                { valor: 8, etiqueta: "MERCEDES DE ORIENTE" },
                { valor: 9, etiqueta: "OPATORO" },
                { valor: 10, etiqueta: "SAN ANTONIO DEL NORTE" },
                { valor: 11, etiqueta: "SAN JOSE" },
                { valor: 12, etiqueta: "SAN JUAN" },
                { valor: 13, etiqueta: "SAN PEDRO DE TUTULE" },
                { valor: 14, etiqueta: "SANTA ANA" },
                { valor: 15, etiqueta: "SANTA ELENA" },
                { valor: 16, etiqueta: "SANTA MARIA" },
                { valor: 17, etiqueta: "SANTIAGO DE PURINGLA" },
                { valor: 18, etiqueta: "YARULA" }
            ]
        },
        {
            id: 12,
            nombre: "LEMPIRA",
            municipios: [
                { valor: 0, "name": "GRACIAS" },
                { valor: 1, "name": "BELEN" },
                { valor: 2, "name": "CANDELARIA" },
                { valor: 3, "name": "COLOLACA" },
                { valor: 4, "name": "ERANDIQUE" },
                { valor: 5, "name": "GUALCINCE" },
                { valor: 6, "name": "GUARITA" },
                { valor: 7, "name": "LA CAMPA" },
                { valor: 8, "name": "LA IGUALA" },
                { valor: 9, "name": "LAS FLORES" },
                { valor: 10, "name": "LA UNION" },
                { valor: 11, "name": "LA VIRTUD" },
                { valor: 12, "name": "LEPAERA" },
                { valor: 13, "name": "MAPULACA" },
                { valor: 14, "name": "PIRAERA" },
                { valor: 15, "name": "SAN ANDRES" },
                { valor: 16, "name": "SAN FRANCISCO" },
                { valor: 17, "name": "SAN JUAN GUARITA" },
                { valor: 18, "name": "SAN MANUEL COLOHETE" },
                { valor: 19, "name": "SAN RAFAEL" },
                { valor: 20, "name": "SAN SEBASTIAN" },
                { valor: 21, "name": "SANTA CRUZ" },
                { valor: 22, "name": "TALGUA" },
                { valor: 23, "name": "TAMBLA" },
                { valor: 24, "name": "TOMALA" },
                { valor: 25, "name": "VALLADOLID" },
                { valor: 26, "name": "VIRGINIA" },
                { valor: 27, "name": "SAN MARCOS DE CAIQUIN" }
            ]
        },
        {
            id: 13,
            nombre: "OCOTEPEQUE",
            municipios: [
                { valor: 0, etiqueta: "OCOTEPEQUE" },
                { valor: 1, etiqueta: "BELEN GUALCHO" },
                { valor: 2, etiqueta: "CONCEPCION" },
                { valor: 3, etiqueta: "DOLORES MERENDON" },
                { valor: 4, etiqueta: "FRATERNIDAD" },
                { valor: 5, etiqueta: "LA ENCARNACION" },
                { valor: 6, etiqueta: "LA LABOR" },
                { valor: 7, etiqueta: "LUCERNA" },
                { valor: 8, etiqueta: "MERCEDES" },
                { valor: 9, etiqueta: "SAN FERNANDO" },
                { valor: 10, etiqueta: "SAN FRANCISCO DEL VALLE" },
                { valor: 11, etiqueta: "SAN JORGE" },
                { valor: 12, etiqueta: "SAN MARCOS" },
                { valor: 13, etiqueta: "SANTA FE" },
                { valor: 14, etiqueta: "SENSENTI" },
                { valor: 15, etiqueta: "SINUAPA" }
            ]
        },
        {
            id: 14,
            nombre: "OLANCHO",
            municipios: [
                { valor: 0, etiqueta: "JUTICALPA" },
                { valor: 1, etiqueta: "CAMPAMENTO" },
                { valor: 2, etiqueta: "CATACAMAS" },
                { valor: 3, etiqueta: "CONCORDIA" },
                { valor: 4, etiqueta: "DULCE NOMBRE DE CULMI" },
                { valor: 5, etiqueta: "EL ROSARIO" },
                { valor: 6, etiqueta: "ESQUIPULAS DEL NORTE" },
                { valor: 7, etiqueta: "GUALACO" },
                { valor: 8, etiqueta: "GUARIZAMA" },
                { valor: 9, etiqueta: "GUATA" },
                { valor: 10, etiqueta: "GUAYAPE" },
                { valor: 11, etiqueta: "JANO" },
                { valor: 12, etiqueta: "LA UNION" },
                { valor: 13, etiqueta: "MANGULILE" },
                { valor: 14, etiqueta: "MANTO" },
                { valor: 15, etiqueta: "SALAMA" },
                { valor: 16, etiqueta: "SAN ESTEBAN" },
                { valor: 17, etiqueta: "SAN FRANCISCO DE BECERRA" },
                { valor: 18, etiqueta: "SAN FRANCISCO DE LA PAZ" },
                { valor: 19, etiqueta: "SANTA MARIA DEL REAL" },
                { valor: 20, etiqueta: "SILCA" },
                { valor: 21, etiqueta: "YOCON" },
                { valor: 22, etiqueta: "PATUCA" }
            ]
        },
        {
            id: 15,
            nombre: "SANTA BARBARA",
            municipios: [
                { valor: 0, etiqueta: "SANTA BARBARA" },
                { valor: 1, etiqueta: "ARADA" },
                { valor: 2, etiqueta: "ATIMA" },
                { valor: 3, etiqueta: "AZACUALPA" },
                { valor: 4, etiqueta: "CEGUACA" },
                { valor: 5, etiqueta: "SAN JOSE DE COLINAS" },
                { valor: 6, etiqueta: "CONCEPCION DEL NORTE" },
                { valor: 7, etiqueta: "CONCEPCION DEL SUR" },
                { valor: 8, etiqueta: "CHINDA" },
                { valor: 9, etiqueta: "EL NISPERO" },
                { valor: 10, etiqueta: "GUALALA" },
                { valor: 11, etiqueta: "ILAMA" },
                { valor: 12, etiqueta: "MACUELIZO" },
                { valor: 13, etiqueta: "NARANJITO" },
                { valor: 14, etiqueta: "NUEVO CELILAC" },
                { valor: 15, etiqueta: "PETOA" },
                { valor: 16, etiqueta: "PROTECCION" },
                { valor: 17, etiqueta: "QUIMISTAN" },
                { valor: 18, etiqueta: "SAN FRANCISCO DE OJUERA" },
                { valor: 19, etiqueta: "SAN LUIS" },
                { valor: 20, etiqueta: "SAN MARCOS" },
                { valor: 21, etiqueta: "SAN NICOLAS" },
                { valor: 22, etiqueta: "SAN PEDRO DE ZACAPA" },
                { valor: 23, etiqueta: "SANTA RITA" },
                { valor: 24, etiqueta: "SAN VICENTE CENTENARIO" },
                { valor: 25, etiqueta: "TRINIDAD" },
                { valor: 26, etiqueta: "LAS VEGAS" },
                { valor: 27, etiqueta: "NUEVA FRONTERA" }
            ]
        },
        {
            id: 16,
            nombre: "VALLE",
            municipios: [
                { valor: 0, etiqueta: "NACAOME" },
                { valor: 1, etiqueta: "ALIANZA" },
                { valor: 2, etiqueta: "AMAPALA" },
                { valor: 3, etiqueta: "ARAMECINA" },
                { valor: 4, etiqueta: "CARIDAD" },
                { valor: 5, etiqueta: "GOASCORAN" },
                { valor: 6, etiqueta: "LANGUE" },
                { valor: 7, etiqueta: "SAN FRANCISCO DE CORAY" },
                { valor: 8, etiqueta: "SAN LORENZO" }
            ]
        },
        {
            id: 17,
            nombre: "YORO",
            municipios: [
                { valor: 0, etiqueta: "YORO" },
                { valor: 1, etiqueta: "ARENAL" },
                { valor: 2, etiqueta: "EL NEGRITO" },
                { valor: 3, etiqueta: "EL PROGRESO" },
                { valor: 4, etiqueta: "JOCON" },
                { valor: 5, etiqueta: "MORAZAN" },
                { valor: 6, etiqueta: "OLANCHITO" },
                { valor: 7, etiqueta: "SANTA RITA" },
                { valor: 8, etiqueta: "SULACO" },
                { valor: 9, etiqueta: "VICTORIA" },
                { valor: 10, etiqueta: "YORITO" }
            ]
        }
    ];
    return departamentos;
  }
}
