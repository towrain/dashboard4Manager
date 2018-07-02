import React from 'react';
import ReactDOM from 'react-dom';
import { Card,Divider,Button,Icon,Modal,DatePicker,Select,Badge,BackTop,Input,Row, Col,Timeline,Table,Affix,Popover,Steps,message } from 'antd';
import 'antd/dist/antd.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;
const Step = Steps.Step;
function onChange(date, dateString) {
    console.log(date, dateString);
  }

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const columns = [
    { title: ' Portal ID ', dataIndex: 'name', key: 'name' },
    { title: 'RSP', dataIndex: 'age', key: 'age' },
    { title: 'Follow Up Date', dataIndex: 'address', key: 'address' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Edit</a> },
];
const data = [
    { key: 1, name: '101223465', age: 'Spark', address: 'New York No. 1 Lake Park', },
    { key: 2, name: '101223460', age: 'Vodafone', address: 'London No. 1 Lake Park',  },
    { key: 3, name: '101223461', age: '2 Degrees', address: 'Sidney No. 1 Lake Park',  },
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
};
const steps = [{
    title: 'First',
    content: 'First-content',
  }, {
    title: 'Second',
    content: 'Second-content',
  }, {
    title: 'Last',
    content: 'Last-content',
  }];

function handleChange(value) {
    console.log(`selected ${value}`);
}

function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
}

class ManagerDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreStyle: {},
            visible: false,
            pmVisible: false,
            reportVisible: false,
            title :'',
            pmTitle :'',
            expiredMessage :'',
            current: 0,
            chartData : [
                {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
            ],
        }
    }
    showModal = event =>{
        console.log("hellow word")
        this.setState({
            visible: true,
            title:`${event} Information`,
        });
    }
    showPMModal= event =>{
        this.setState({
            pmTitle:`Follow Up From ${event}`,
            pmVisible: true,
        });
    }
    showExpiredModal= event =>{
        this.setState({
            expiredMessage:`${event}`,
            expiredVisible: true,
        });
        console.log(`${event}`)
        if(event === "Expired Orders"){
            console.log("this is the Expired Orders windoe")
        }
        else if(event === "Expire in 8 Hours"){
            console.log("this is the EExpire in 8 Hours windoe")
        }
        else{
            console.log("Expired in 24 Hours")
        }
    }
    //showReportModal
    showReportModal= event =>{
        this.setState({
            reportVisible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
    }
    handlePMCancel = (e) => {
        this.setState({
          pmVisible: false,
        });
    }
    handleReportCancel = (e) => {
        this.setState({
            reportVisible: false,
        });
    }
    handleExpiredCancel = (e) => {
        this.setState({
          expiredVisible: false,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
        expiredVisible: false,
        });
      }

    next() {
    const current = this.state.current + 1;
    this.setState({ current });
    }

    prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    }
    render() {
    const { current } = this.state;
      return (
        <div>
            <BackTop visibilityHeight = {10}/>
           <div>
            <Affix style={{ position: 'absolute', top: '50%', right:100 }}>
                <Popover content={<small>U can create ur own report in 3 steps</small>} >  
                    <Button type="primary" size="large" onClick={this.showReportModal}>
                        <Icon type="form" />
                    </Button>
                </Popover>
            </Affix>
            <Modal
            destroyOnClose={true}
            title="Creating Report"
            width="85%"
            visible={this.state.reportVisible}
            onCancel={this.handleReportCancel}
            footer={null}
            >
                <div>
                    <div>
                        <p>
                        <Input placeholder={steps[current].content} />
                        </p>
                    </div>
                    <br />
                    <Steps current={current} size="small">
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <hr />
                    <div>
                    {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        current === steps.length - 1
                        && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        current > 0
                        && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                        Previous
                        </Button>
                        )
                    }
                    </div>
                </div>
            </Modal>
            </div>
            <br/>
            <br/>
                <Input addonBefore="Portal ID : " placeholder="Please Put Portal ID" />
            <hr />
{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BAU  Management!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <Divider >
                <h3 style={{fontFamily:"Times New Roman"}}><em><b> Task Information</b></em></h3>
            </Divider>
            <Row type="flex" justify="space-around" gutter={8}>
            <Col span={6}>               
            <Card type={'inner'} title="PM"  extra={<Button onClick={() => this.showModal('PM')} type="primary">More</Button>} hoverable >
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width = {1100}
                    destroyOnClose = {true}>
                        <p>Please Select Date Range </p>
                        <RangePicker disabledDate={disabledDate} onChange={onChange}  autoFocus = {true} allowClear={true}  style={{ width: '100%' }}/>
                        <hr/>
                        <p>Please Select a Agent / Agents Name </p>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select Agent"
                            notFoundContent = 'SomeThing Worry , Please Contact Admin'
                            onChange={handleChange}
                            allowClear = {true}
                        >
                            <OptGroup label="Courtney">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </OptGroup>
                            <OptGroup label="Helen">
                                <Option value="Yiminghe">yiminghe</Option>
                            </OptGroup>
                        </Select>   
                        <hr/>
                        <div>
                        <LineChart width={1050} height={400} data={this.state.chartData} style={this.state.chartStyle}>
                            <XAxis dataKey="name" label={{ value: "Date", position: 'insideBottomRight', offset: -5 }}/>
                            <YAxis label={{ value: "Numbers", angle: -90, position: 'insideLeft' }}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                        </div>
                </Modal> 
                <p> PMs Completed Today :</p>
                <Divider />
                <p> PMs Completed This Week :</p>
                <Divider />
                <p> PMs Completed This Month :</p>
            </Card>
            </Col>
            <Col span={6}>
                <Card type={'inner'} title="MCI" extra={<Button onClick={() => this.showModal('MCI')} type="primary">More</Button>}  hoverable>          
                <p> MCIs Completed Today :</p>
                <Divider />
                <p> MCIs Completed This Week :</p>
                <Divider />
                <p> MCIs Completed This Month :</p>
                </Card>
            </Col>
            <Col span={6}>                
            <Card type={'inner'} title="Task"  extra={<Button onClick={() => this.showModal('Task')} type="primary">More</Button>}  hoverable> 
                <p> Task Completed Today :</p>
                <Divider />
                <p> Task Completed This Week :</p>
                <Divider />
                <p> Task Completed This Month :</p>
                </Card>
            </Col>
            <Col span={6}>
                <Card type={'inner'} title="Call"  extra={<Button onClick={() => this.showModal('Call')} type="primary">More</Button>}  hoverable>
                    
                <p> Calls Completed Today :</p>
                <Divider />
                <p> Calls Completed This Week :</p>
                <Divider />
                <p> Calls Completed This Month :</p>
                </Card></Col>
        </Row>
        <br/>

        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Follow Up Management!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

        <Divider ><h3 style={{fontFamily:"Times New Roman"}}><em><b>Proactive Management</b></em></h3></Divider>
        <Divider orientation="left">Follow Up Management </Divider>
            <div className="row">
                <div className="col-sm-4">
                    <Card type={'inner'} title="RSP"  extra={<Button onClick={() => this.showPMModal('RSP')} type="primary" style={{backgroundColor : "green"}}>Action</Button>} style={{ width: 330 }} hoverable>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Modal
                        title={this.state.pmTitle}
                        visible={this.state.pmVisible}
                        onCancel={this.handlePMCancel}
                        width = {1100}
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <div className="col-sm-4">
                <Card type={'inner'} title="Service Company"  extra={<Button onClick={() => this.showPMModal('Service Company')} type="primary" style={{backgroundColor : "green"}}>Action</Button>} style={{ width: 330 }} hoverable>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                </div><div className="col-sm-4">
                <Card type={'inner'} title="Internal Agent"  extra={<Button onClick={() => this.showPMModal('Internal Agent')} type="primary" style={{backgroundColor : "green"}}>Action</Button>} style={{ width: 330 }} hoverable>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                </div>
            </div>
{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Expired MANAGEMENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <Divider orientation="left">Expired PM Orders </Divider>
            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        type={'inner'}
                        title="Expired Order"  
                        extra={<Badge count={999}  showZero ={true} onClick={() => this.showExpiredModal('Expired Orders')}/>}
                        style={{ width: 330 }}
                        // actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        hoverable>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                    </Card>
                    <Modal
                        title={this.state.expiredMessage}
                        visible={this.state.expiredVisible}
                        onCancel={this.handleExpiredCancel}
                        onOk={this.handleOk}
                        footer={[
                            <Button key="back" onClick={this.handleExpiredCancel}>Return</Button>,
                            <Button key="submit" type="primary" onClick={this.handleOk} disabled>
                              Assign Order to
                            </Button>,
                          ]}
                        width = {1100}
                        destroyOnClose = {true}
                        >
                        <Table
                            size="small"
                            bordered
                            pagination={{ pageSize: 50 }} 
                            columns={columns}
                            rowSelection={rowSelection}
                            //expandRowByClick = "true"
                            dataSource={data}
                            expandedRowRender={record => 
                            <div>
                                <br/>
                                <Timeline>
                                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                </Timeline>
                            </div>}
                            
                        />
                    </Modal>
                </div>
                <div className="col-sm-4">
                    <Card 
                        type={'inner'}
                        title="Expired in 8 Hours"  
                        extra={<Badge count={999}  showZero ={true} onClick={() => this.showExpiredModal('Expire in 8 Hours')}/>}
                        style={{ width: 330 }}
                        //actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        hoverable>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                    </Card>
                </div>
                <div className="col-sm-4">
                    <Card 
                        type={'inner'}
                        title="Expired in 24 Hours"  
                        extra={<Badge count={999}  showZero ={true}  onClick={() => this.showExpiredModal('Expired in 24 Hours')}/>}
                        style={{ width: 330 }}
                        //actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        hoverable>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                    </Card>

                </div>
            </div>
            <br/>
        </div>
      )
    }
  }




ReactDOM.render(<ManagerDashBoard />, document.getElementById('root'));


// ReactDOM.render(hello, );
// registerServiceWorker();
