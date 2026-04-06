import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

function RefreshButton({ onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  };

  return (
    <div>
      <Button type="primary" loading={refreshing} onClick={handleRefresh}>
        {refreshing ? null : (
          <>
            <ReloadOutlined />
          </>
        )}
        {" Refresh"}
      </Button>
    </div>
  );
}

export default RefreshButton;
