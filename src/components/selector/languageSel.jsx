// export default LanguageSelector;
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

const items = [
  // Language items with their respective flags

  {
    key: "sin",
    label: {
      name: "සිංහල", // Sinhala
      flag: "https://flagcdn.com/lk.svg",
    },
  },
  {
    key: "en",
    label: {
      name: "English", // English
      flag: "https://flagcdn.com/us.svg",
    },
  },
  {
    key: "ar",
    label: {
      name: "العربية", // Arabic
      flag: "https://flagcdn.com/sa.svg",
    },
  },
  {
    key: "Chi",
    label: {
      name: "中文", // Chinese
      flag: "https://flagcdn.com/cn.svg",
    },
  },
  {
    key: "es",
    label: {
      name: "Español", // Spanish
      flag: "https://flagcdn.com/es.svg",
    },
  },
  {
    key: "jpn",
    label: {
      name: "日本語", // Japanese
      flag: "https://flagcdn.com/jp.svg",
    },
  },
  {
    key: "ta",
    label: {
      name: "தமிழ்", // Tamil
      flag: "https://flagcdn.com/in.svg",
    },
  },
  {
    key: "de",
    label: {
      name: "Deutsch", // German
      flag: "https://flagcdn.com/de.svg",
    },
  },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  // const [selected, setSelected] = useState(i18n.language);
  const [selected, setSelected] = useState("en");
  const handleSelect = ({ key }) => {
    //console.log(Language selected: ${key});
    i18n.changeLanguage(key); // Change the language using i18n
    setSelected(key);
  };

  return (
    // <Dropdown
    //   menu={{
    //     items,
    //     selectable: true,
    //     onSelect: handleSelect, // Pass the function reference here, don't invoke it
    //     defaultSelectedKeys: [i18n.language],
    //   }}
    // >
    <Dropdown
      menu={{
        items: items.map((item) => ({
          key: item.key,
          label: (
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={item.label.flag}
                alt={item.label.name}
                style={{ width: 20, marginRight: 8 }}
              />
              {item.label.name}
            </span>
          ),
        })),
        selectable: true,
        onSelect: handleSelect,
        defaultSelectedKeys: [i18n.language],
      }}
    >
      <Typography.Link>
        <Space>
          {/* Selectable {selected}{" "} */}
          <img
            src={items.find((item) => item.key === selected).label.flag}
            alt={items.find((item) => item.key === selected).label.name}
            style={{ width: 20, marginRight: 8 }}
          />
          {items.find((item) => item.key === selected).label.name}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
}

export default LanguageSelector;
