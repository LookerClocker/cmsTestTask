import React from 'react'

const DummyTable = (props) => (
    <tr key={props.tabInfo.id}>
            <td>{props.tabInfo.id}</td>
            <td>{props.tabInfo.title}</td>
            <td>{props.tabInfo.order}</td>
            <td>{props.tabInfo.path}</td>
        </tr>
);

export default DummyTable
