import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

const LocationCard = ({ location }) => {
  console.log(location);

  return (
    <div>
      <Card
        bordered
        className=" p-0 h-full border-primary-300 rounded-lg w-full hover:shadow-primary-1 hover:border-primary-400 hover:bg-primary-50"
      >
        <div className=" font-bold text-2xl">
          <p>{location.name}</p>
        </div>
        <div className=" flex pb-5">
          <div className=" font-medium">Type: </div>
          <div className=" px-4"> {location.type}</div>
        </div>
        <div className=" flex gap-4 justify-end">
          <div className="">
            <Button type="primary">
              <EditOutlined />
            </Button>
          </div>
          <div className="">
            <Button danger>
              <DeleteOutlined />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LocationCard;
