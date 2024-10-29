interface IDirectorio {
  distinguido: string;
  completo: string;
  apellido: string;
  nombre: string;
}

interface IUsuario {
  principal: string;
  cuenta: string;
  nombre: string;
}

interface IInformacionPersonal {
  nombre: {
    completo: string;
  };
  correoElectronico: string;
}

interface IGrupo {
  tipo: string;
  descripcion: string;
  distinguido: string;
  completo: string;
}

export interface IGroupInfo {
  directorio: IDirectorio;
  usuario: IUsuario;
  tiempoBloqueo: string;
  fechaCreacion: string;
  ultimoGrupo: string;
  nombreMostrar: string;
  descripcion: string;
  informacionPersonal: IInformacionPersonal;
  grupos: IGrupo[];
}
