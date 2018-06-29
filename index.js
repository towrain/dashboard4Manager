import React from 'react';
import ReactDOM from 'react-dom';
import { Card,Divider,Button,Icon,Modal,DatePicker,Select,Badge,BackTop,Input,Row, Col,} from 'antd';
import 'antd/dist/antd.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;

function onChange(date, dateString) {
    console.log(date, dateString);
  }

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
            //chartStyle:{display: 'none'},
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
        });
    }
    showPMModal= event =>{
        this.setState({
            pmVisible: true,
        });
    }
    mouseOver = event =>{
        this.setState({moreStyle: {fontSize: 20, color: '#08c'}})
    }
    mouseOut = event =>{
        this.setState({moreStyle: {}})
    }
    // handleOk = (e) => {
    //     console.log(e);
    //     this.setState({
    //       visible: false,
    //     });
    //   }
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
    render() {
      return (
        <div>
            <BackTop visibilityHeight = {10}/>
            <br/>
            <br/>
                <Input addonBefore="Portal ID : " placeholder="Please Put Portal ID" />
            <hr />
            <Divider >
                <h3 style={{fontFamily:"Times New Roman"}}><em><b> Task Information</b></em></h3>
            </Divider>
       
            <Row type="flex" justify="space-around" gutter={8}>
            <Col span={6}>               
            <Card type={'inner'} title="PM"  extra={<Button onClick={this.showModal} type="primary">More</Button>} hoverable >
                    <Modal
                    title="PM Information"
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
                <Card type={'inner'} title="MCI"  extra={<Button onClick={this.showModal} type="primary">More</Button>}  hoverable>
                    <Modal
                    title="MCI Information"
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
                <p> MCIs Completed Today :</p>
                <Divider />
                <p> MCIs Completed This Week :</p>
                <Divider />
                <p> MCIs Completed This Month :</p>
                </Card>
            </Col>
            <Col span={6}>                
            <Card type={'inner'} title="Task"  extra={<Button onClick={this.showModal} type="primary">More</Button>}  hoverable>
                    <Modal
                    title="Task Information"
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
                <p> Task Completed Today :</p>
                <Divider />
                <p> Task Completed This Week :</p>
                <Divider />
                <p> Task Completed This Month :</p>
                </Card>
            </Col>
            <Col span={6}>
                <Card type={'inner'} title="Call"  extra={<Button onClick={this.showModal} type="primary">More</Button>}  hoverable>
                    <Modal
                    title="Call Information"
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
                <p> Calls Completed Today :</p>
                <Divider />
                <p> Calls Completed This Week :</p>
                <Divider />
                <p> Calls Completed This Month :</p>
                </Card></Col>
        </Row>
        <br/>
        <Divider ><h3 style={{fontFamily:"Times New Roman"}}><em><b>Proactive Management</b></em></h3></Divider>
        <Divider orientation="left">Follow Up Management </Divider>
            <div className="row">
                <div className="col-sm-4">
                    <Card title="RSP"  extra={<Button onClick={this.showPMModal} type="primary" style={{backgroundColor : "green"}}>Action</Button>} style={{ width: 330 }} hoverable>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className="col-sm-4">
                <Card title="Service Company"  extra={<Button onClick={this.showModal} type="primary" style={{backgroundColor : "green"}}>Action</Button>} style={{ width: 330 }} hoverable>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                </div><div className="col-sm-4">
                <Card title="Internal Agent"  extra={<Button onClick={this.showModal} type="primary" style={{backgroundColor : "green"}}>Action</Button>} style={{ width: 330 }} hoverable>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                </div>
            </div>
        <Divider orientation="left">Expired PM Orders </Divider>
            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        title="Expired Order"  
                        extra={<Badge count={999}  showZero ={true} onClick={this.showPMModal}/>}
                        style={{ width: 330 }}
                        actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        hoverable>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                    </Card>
                    <Modal
                        title="Expired Orders"
                        visible={this.state.pmVisible}
                        onCancel={this.handlePMCancel}
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <div className="col-sm-4">
                    <Card 
                        title="Expired in 8 Hours"  
                        extra={<Badge count={999}  showZero ={true} onClick={this.showPMModal}/>}
                        style={{ width: 330 }}
                        actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        hoverable>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                    </Card>
                    <Modal
                        title="Orders Expire in 8 Hours"
                        visible={this.state.pmVisible}
                        onCancel={this.handlePMCancel}
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <div className="col-sm-4">
                    <Card 
                        description = 'hwopfhoiewhfiwhohoitrhi'
                        title="Expired in 24 Hours"  
                        extra={<Badge count={999}  showZero ={true} onClick={this.showPMModal}/>}
                        style={{ width: 330 }}
                        actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        hoverable>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                    </Card>
                    <Modal
                        title="Orders Expire in 24 Hours"
                        visible={this.state.pmVisible}
                        onCancel={this.handlePMCancel}
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
      )
    }
  }




ReactDOM.render(<ManagerDashBoard />, document.getElementById('root'));


// ReactDOM.render(hello, );
// registerServiceWorker();
