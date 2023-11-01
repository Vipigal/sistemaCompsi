export default function validateEnvString(envString: string | undefined) {
  if (!envString) throw new Error("Falha ao carregar variável de ambiente");
  return envString;
}
