export default interface ResolveVanityURL {
  response: {
    success: 1 | 42;
    steamid?: string;
    message?: string;
  };
}
