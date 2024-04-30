export const markerSelector = (item: string) => {
  switch (item) {
    case "동남아":
      return "/images/markers/동남아.png";
    case "베이커리":
      return "/images/markers/베이커리.png";
    case "복어취급":
      return "/images/markers/복어취급.png";
    case "분식":
      return "/images/markers/분식.png";
    case "술집":
      return "/images/markers/술집.png";
    case "양식":
      return "/images/markers/술집.png";
    case "인도_중동":
      return "/images/markers/인도_중동.png";
    case "일식":
      return "/images/markers/일식.png";
    case "중국식":
      return "/images/markers/중국식.png";
    case "카페":
      return "/images/markers/카페.png";
    case "탕류":
      return "/images/markers/탕류.png";
    case "한식":
      return "/images/markers/한식.png";
    default:
      return "/images/markers/default.png";
  }
};
