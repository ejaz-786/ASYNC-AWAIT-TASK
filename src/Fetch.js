import React, { useEffect, useState } from "react";
import { Page, Layout, Card } from "@shopify/polaris";
import { Select } from "@shopify/polaris";
import { Button } from "@shopify/polaris";
import { TextField } from "@shopify/polaris";
const Fetch = () => {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [rendering, setRendering] = useState([]);

  const fetchData = async () => {
    let response = await fetch(
      "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0OTg4NjM3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2Q3ZDlkYjgyM2I5MTVhMzc0NTA3NSJ9.eZKlcA00P9R_hw-ThPqMP1G_ntdht2hoh2Sx9FhfFXsw1725An17BDLLEA5GYGEXr-vtrUMoWq2E7_sRAkFvvbBrEljQenYRUH0VxIdgFvUk3ptoh9_x63ZhOpS2LhW0v5G16fZiY4StoArQZ3TVRrzqf9b5ZGVrlxh7RjR6oZEzLg6UHqPdYXn5o1J0FdoyCndaDo8y3XwNBPUJU1BqnVMxeYYFnYlxWCpH1jq8IjSrP1YSQARMZhAfqrxuN73utQMwf5EYR4_2fM8Iz-LiwN7wVkRkoj7hDTeQtVx_736tycu6f4lLf03CZ0mxzrbAXuifl3eJsHKso0lgL4UxPg`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify({
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          selected: [...selectedOption],
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        }),
      }
    );
    let result = await response.json();
   
    setRendering([...rendering, result]);
    setFullData(result.data);
    setData([...data, result.data.map((i) => i.name)]);
  };

  // Calling fetch function
  useEffect(() => {
    fetchData();
  }, [selectedOption]);


  const handleSelectChange = (value) => {
    setSelected([...selected, value]);
    fullData.map((i) => {
      if (i.name === value && i.hasChildren === true) {
        setSelectedOption(i.parent_id);
      } else if (i.name === value && i.hasChildren === false) {
      console.log("No Children")
      }
      return 1;
    });
  };

  return (
    <>
      <Page Width>
        <Layout>
          <Layout.Section>
            {rendering.map((i, index) => {
              return (
                <>
                  <Card sectioned>
                    <Select
                      placeholder="Select"
                      key={index}
                      options={data[index]}
                      onChange={handleSelectChange}
                      value={selected[index]}
                    />
                  </Card>
                </>
              );
            })}
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};
export default Fetch;