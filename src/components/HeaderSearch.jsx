import Search from "antd/es/transfer/search";
function HeaderSearch() {
  function onSearch(value) {
    console.log(value);
  }

  return (
    <Search
      className="bg-gray-200"
      placeholder="Input Search Text"
      onSearch={onSearch}
      enterButton
    />
  );
}

export default HeaderSearch;
