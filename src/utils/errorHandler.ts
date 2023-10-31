export function TrataErrorUtil(error: unknown) {
  console.error(error);
  const errorMessage =
    error instanceof Error ? error.message : "Erro desconhecido";
  return {
    message: errorMessage,
    status: 400,
  };
}
