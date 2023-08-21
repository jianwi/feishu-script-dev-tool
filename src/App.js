import './App.css';
import {bitable} from "@base-open/web-api";
import {useEffect, useState} from "react";
import {message, Table} from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {
    const [baseInfo, setBaseInfo] = useState({
        baseId: "",
        fieldId: "",
        tableId: "",
        recordId: "",
        viewId: ""
    })

    useEffect(() => {
        bitable.base.onSelectionChange(async (selection) => {
            let info = selection.data
            setBaseInfo({
                baseId: info.baseId,
                fieldId: info.fieldId,
                tableId: info.tableId,
                recordId: info.recordId,
                viewId: info.viewId
            })
        })
        getInfo()
    }, [])


    async function getInfo() {
        let res = await bitable.base.getSelection()
        setBaseInfo({
            baseId: res.baseId,
            fieldId: res.fieldId,
            tableId: res.tableId,
            recordId: res.recordId,
            viewId: res.viewId
        })
    }

    return (
        <div>
            <Table
                showHeader={false}
                pagination={false}
                dataSource={Reflect.ownKeys(baseInfo).map(item => {
                    return {
                        key: item,
                        value: baseInfo[item]
                    }
                })} columns={[
                {
                    title: 'Key',
                    dataIndex: 'key',
                    key: 'key',
                },
                {
                    title: 'Value',
                    dataIndex: 'value',
                    key: 'value',
                    render: (text) => (  text? <CopyToClipboard
                        onCopy={() => {
                            console.log("复制成功")
                            message.success("复制成功: "+text)
                        }}
                        text={text}>
                        <span style={{ cursor: 'pointer' }}>{text}</span>
                    </CopyToClipboard>:'选中单元格后显示')
                }
            ]}/>

        </div>
    );
}

export default App;
