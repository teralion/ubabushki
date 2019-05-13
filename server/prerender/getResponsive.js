
export default function getResponsive(useragent) {
  const { isMobile = false } = useragent;
  return { isMobile };
}
