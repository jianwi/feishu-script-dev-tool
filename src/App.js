import './App.css';
import {bitable} from "@base-open/web-api";
import {useEffect, useState} from "react";
import {message, Table, Tooltip, Button} from "antd";
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

    const nameMap = {
        baseId: "Base ID(appToken)",
        fieldId: "Field(列) ID",
        tableId: "Table(数据表) ID",
        recordId: "Record(行) ID",
        viewId: "View(视图) ID"
    }

    return (
        <div>
            <Table
                showHeader={false}
                pagination={false}
                dataSource={Reflect.ownKeys(baseInfo).map(item => {
                    return {
                        key: nameMap[item],
                        value: baseInfo[item]
                    }
                })} columns={[
                {
                    title: 'Key',
                    dataIndex: 'key',
                    key: 'key',
                    render: (text) => <div style={{
                        fontSize: "8px",
                        width: "120px",
                        fontWeight: "bold"
                    }}>{text}</div>
                },
                {
                    title: 'Value',
                    dataIndex: 'value',
                    key: 'value',
                    render: (text) => (text ? <Tooltip title={'点击复制'} arrowContent={true}><CopyToClipboard
                        onCopy={() => {
                            console.log("复制成功")
                            message.success("复制成功")
                        }}
                        text={text}>
                        <Button placeholder={'点击复制'} type={'link'} style={{cursor: 'pointer'}}>{text}</Button>
                    </CopyToClipboard></Tooltip> : '选中单元格后显示')
                }
            ]}/>

        </div>
    );
}

export default App;
