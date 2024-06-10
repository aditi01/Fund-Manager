import { Avatar, Drawer, Space, Table, Divider, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ColumnGroupType, ColumnType } from 'antd/es/table';

interface IProps {
    isOpen: boolean,
    data: any,
    onClose: () => void
}

const UserProfile = (props: IProps) => {
    const {isOpen, data, onClose} = props

    const fetchColumns = () => {
        const columns: (ColumnGroupType<{ fundId: string; }> | ColumnType<{ fundId: string; }>)[] = [
            {
              title: 'Fund Name',
              dataIndex: 'fundName',
              key: 'fundName',
            },
            {
              title: 'Fund Type',
              dataIndex: 'fundType',
              key: 'fundType',
            },
            {
              title: 'Inception Date',
              dataIndex: 'inceptionDate',
              key: 'inceptionDate',
            },
            {
              title: 'Assets Under Management',
              dataIndex: 'assetsUnderManagement',
              key: 'assetsUnderManagement',
            },
            {
              title: '1 Year Performance',
              dataIndex: ['performance', '1year'],
              key: '1year',
            },
            {
              title: '3 Years Performance',
              dataIndex: ['performance', '3years'],
              key: '3years',
            },
            {
              title: '5 Years Performance',
              dataIndex: ['performance', '5years'],
              key: '5years',
            },
            {
              title: 'Top Holdings',
              dataIndex: 'topHoldings',
              key: 'topHoldings',
              render: (topHoldings: any[]) => (
                <ul>
                  {topHoldings.map(holding => (
                    <li key={holding.stockSymbol}>
                      {holding.stockSymbol} - {holding.percentage}
                    </li>
                  ))}
                </ul>
              ),
            },
          ];

          return columns
    }


  return (
    <>
        <Drawer
            width={window.innerWidth > 900 ? 1200 : window.innerWidth - 100}
            title={`User Data of ${data.name}`}
            placement='right'
            closable={true}
            onClose={onClose}
            open={isOpen}>

            <Space wrap size={16}>
                <Avatar size={64} icon={<UserOutlined />} />
                <b>User ID:</b><div>{data.id}</div>
            </Space>
            <Divider />
            <h4>Contact Info:</h4>

            <Row>
                <Col>Email: </Col>
                <Col>Contact No.: </Col>
            </Row>


            <Table dataSource={data.managedFunds} columns={fetchColumns()} rowKey="fundId" />

      </Drawer>
    </>
  );
};

export default UserProfile;
