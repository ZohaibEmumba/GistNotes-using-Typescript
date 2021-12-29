import { useState, useContext, useEffect, useCallback } from "react";
import { Table } from "antd";
import { GistContext } from "../../context/GistContext";
import { Section } from "../stared-gists/style";
import { columns } from '../../utils/StarGistUtilis';
import { VISIBLESCREEN } from "../../constants";
import { getFilterData } from "../../utils/SearchGistUserUtilis";
import Spinner from "../common/Spinner/Spinner";

const SearchGists = () => {
  const [searchRecordsData, setSearchRecordsData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { state, dispatch } = useContext(GistContext);
  const { searchValue } = state;

  const showUniqueGistRecord = useCallback((gistID: string) => {
    dispatch({
      type: VISIBLESCREEN,
      payload: {
        tab: 9,
        gistID: gistID,
      },
    });
    /* eslint-disable */
  }, []);
 /* eslint-enable */

  const onRow = useCallback((record: any) => {
    return { onClick: () => showUniqueGistRecord(record?.id) };
    /* eslint-disable */
  }, [])
  /* eslint-enable */


  useEffect(() => {
    getFilterData(searchValue , loading , setLoading , searchRecordsData , setSearchRecordsData );
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  return (
    loading ? (
      <Spinner />
    ) : (
      <Section>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={[...searchRecordsData]}
          onRow={onRow}
        />
      </Section>
    )
  );
};

export default SearchGists;
