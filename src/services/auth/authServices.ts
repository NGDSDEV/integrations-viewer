import { axiosClient } from "@/config/axiosConfig";
import { IGroupInfo } from "@/types/auth";
export interface LoginResponse {
  resultado: Resultado[];
}

export interface Resultado {
  codigo: string;
  descripcion: string;
}

const groupsInfoByUser: IGroupInfo[] = [
  {
    directorio: {
      distinguido: "CN=DIV_COLS,OU=Aplicaciones,OU=Colsubsidio,DC=cols,DC=com",
      completo: "My User System",
      apellido: "System",
      nombre: "My User",
    },
    usuario: {
      principal: "myuser@colsubsidio.com",
      cuenta: "523",
      nombre: "myUser",
    },
    tiempoBloqueo: "0",
    fechaCreacion: "2024-10-10T04:06:27.026Z",
    ultimoGrupo: "13221943",
    nombreMostrar: "My User",
    descripcion: "Usuario de ejemplo",
    informacionPersonal: {
      nombre: {
        completo: "Usuario Sistema",
      },
      correoElectronico: "correo@colsubsidio.com",
    },
    grupos: [
      {
        tipo: "2147483646",
        descripcion: "Colsubsidio Subdireccion Salud",
        distinguido: "CN=DIV_COLS,OU=Aplicaciones,OU=Colsubsidio,DC=cols,DC=com",
        completo: "DIV_COLS",
      },
    ],
  },
];

export const loginService = async (username: string, password: string) => {
  try {
    const response = await axiosClient.post<LoginResponse>(`v2/tecnologia/empleados/auth`, { username, password });
    return response.data;
  } catch {
    if (groupsInfoByUser.length > 0 && groupsInfoByUser[0].grupos.length > 0) {
      return groupsInfoByUser[0];
    }

    throw new Error("Failed to login");
  }
};
