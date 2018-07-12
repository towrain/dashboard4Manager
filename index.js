import React from 'react';
import ReactDOM from 'react-dom';
import { Card,Divider,Button,Icon,Modal,DatePicker,Select,Badge,BackTop,Input,Row, Col,Timeline,Table,Affix,Popover,Steps,message,Popconfirm,notification,Tabs } from 'antd';
import 'antd/dist/antd.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import axios from 'axios';
const { RangePicker } = DatePicker;
const { Option } = Select;
const Step = Steps.Step;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

let children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const columns = [
    { title: ' Portal ID ', dataIndex: 'portalID', key: 'name' },
    { title: 'RSP', dataIndex: 'rsp', key: 'age' },
    { title: 'Task Type', dataIndex: 'taskType', key: 'address' },
    { title: 'Follow Up Date', dataIndex: 'followDate', key: 'address' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a>Edit</a> },
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
    return current && current > moment().endOf('day');
}

function disabledDateByReschedule(current) {
    return current && current < moment().endOf('day');
}


class ManagerDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreStyle: {},
            showChart:{display: 'none'},
            visible: false,
            reportVisible: false,
            BAUtitle :'',
            BAUTaskNow:[],
            BAUTask7:[],
            BAUTask30:[],
            BAUPMNow:'',
            expiredMessage :'',
            portalNumber :'',
            afterIcon :'',
            current: 0,
            startDate:'',
            endDate:'',
            BAUSelectedAgent:[],
            defaultDateValue:moment().subtract(10, 'days'),
            rspValue:[],
            userValues:[],
            pmValue : [],
            pmTLength:'',
            pmWLength:'',
            pmMLength:'',
            pmRSPValues:[],
            pmExpiredValue:[],
            pmExpirein8Value:[],            
            pmExpirein24Value:[], 
            pmInternalValues:[],
            pmRSPFollowUpValues :[],
            pmVisible: false,          
            pmTitle :'',
            pmLoading : true,
            rescheduleDate :'',
            rescheduleDate2 :'',
            pmSercoValues :[
                {name: 'VPL'},
                {name: 'UCG'},
                {name: 'Downer'},
                {name: 'Electronet'},
            ],
            numberofExpiredOrder:'',
            numberofExpire8Order:'',
            numberofExpire24Order:'',
            portalDetailVisible:false,
            portalModelTitle:'',
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
    //    console.log("hellow word")
        this.setState({
            visible: true,
            BAUtitle:`${event} Information`,
        });
    }
    showPMModal= event =>{
        this.setState({
            pmTitle: event,
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
          startDate:'',
          endDate:'',
          showChart:{display: 'none'}
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
    portalNumberChange = (event)=>{
        this.setState({
            portalNumber:event.target.value,
            portalModelTitle :`History Detail for Order ${event.target.value}`
        })
        //add get month below for pull data from database
        axios.get('http://localhost:83/getPortalNumber', {
            params: {
              ID: event.target.value
            }
          }).then(response => {
            console.log(response.data)
            if(response.data.length >= 1 && this.state.portalNumber.length !== 0){
                this.setState({afterIcon:<Icon type="heart" style={{color: 'red' }} onClick={this.showPortalDetail} />})
            } 
            else if(this.state.portalNumber.length === 0){
                this.setState({afterIcon:''})
            }
            else {
                //console.log("i CAN NOT found order") 
                this.setState({afterIcon:<Icon type="heart-o" />})                  
            }
        })
    }
    showPortalDetail = () =>{
        console.log("you have click the heart BTN")
        this.setState({
            portalDetailVisible:true,
        })
    }
    tidyPortalID=()=>{
        this.setState({portalNumber:''})
    }

    handleportalDetailCancel=()=>{
        this.setState({
            portalDetailVisible:false,
        })
    }
    onDateRangeChange=(date,dateString)=> {
        console.log( dateString);
            this.setState({
                startDate:dateString[0],
                endDate:dateString[1],
            })
        
        if(dateString[1] !== ''){
            this.setState({
                showChart:{display: 'block'}
            })
        }
    }
    pmQueryChange= event =>{
        console.log(`u have click cat ${this.state.pmTitle}`)
        console.log(event)

    }
    
    rescheduleDate = (date, dateString)=>{
        this.setState({rescheduleDate : date.format('DD-MM-YYYY')})
    }
    confirmDateChange=(type,event)=>{
        notification[type]({
            message:  event,
            description: 'has been rescheduled',
          });
    }

    cancelDateChange=(type,event)=>{
        notification[type]({
            message:  event,
            description: 'Nothing Changed',
        });
    }
 
    // pmRescehdule
    pmRescehdule=(event,event2,event3)=>{
        ReactDOM.render(
            <div>
                <DatePicker 
                    defaultValue={moment(event3, 'DD-MM-YYYY')}
                    disabledDate={disabledDateByReschedule}
                    onChange = {this.rescheduleDate}
                /> 
                {'       '}
                <Icon type="check-circle-o" style={{color : 'green' , fontSize: 18}} 
                    onClick={() => this.confirmDateChange('success',event)} 
                />
                {'       '}
                <Icon type="close-circle-o" style={{color : 'red' , fontSize: 18}} 
                    onClick={() => this.cancelDateChange('error',event)}
                />
            </div>,
            document.getElementById(event+event2+event3)
        )
    }

    // get rspName + userName + pmName + users + pmRSPName + pmInternalName table data
    componentDidMount=()=>{
        // console.log("i am ready ")
        axios.get('http://localhost:83/rspName').then(response => {
            this.setState({ rspValue : response.data }); 
        })
        axios.get('http://localhost:83/userName').then(response => {
            this.setState({ userValues : response.data }); 
        })
        // BAUTaskNow
        axios.get('http://localhost:83/BAUNow').then(response => {
            this.setState({ BAUTaskNow : response.data, }); 
        })        
        axios.get('http://localhost:83/BAU7Days').then(response => {
            this.setState({ BAUTask7 : response.data,  }); 
        })       
        axios.get('http://localhost:83/BAU30Days').then(response => {
            this.setState({ BAUTask30 : response.data,  }); 
        })        
        //General PM Scetion
        axios.get('http://localhost:83/pmName').then(response => {
            this.setState({ pmValue : response.data, pmLength:response.data.length,pmLoading:false }); 
        })
        axios.get('http://localhost:83/pmRSPName').then(response => {
            this.setState({ pmRSPValues : response.data }); 
        })      
        axios.get('http://localhost:83/pmInternalName').then(response => {
            this.setState({ pmInternalValues : response.data }); 
        })        
       
        axios.get('http://localhost:83/pmExpirein8').then(response => {
            this.setState({ pmExpirein8Value : response.data }); 
        })
        // PM follow up data
        axios.get('http://localhost:83/pmRSPFollowUp').then(response => {
            this.setState({ pmRSPFollowUpValues : response.data }); 
        })
        // PM expired data   
        axios.get('http://localhost:83/pmExpired').then(response => {
            this.setState({ pmExpiredValue : response.data }); 
        }) 
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
                        {/* <Input placeholder={steps[current].content} /> */}
                        <TextArea rows={4} placeholder={steps[current].content} />
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
                        && <Button type="primary" onClick={() => message.success('Processing complete!')}>Download</Button>
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
                <Input  size="large" addonBefore="Portal ID : " addonAfter={this.state.afterIcon} placeholder="Please Put Portal ID" onChange={this.portalNumberChange}/>
            <Modal
                title= {this.state.portalModelTitle} 
                visible={this.state.portalDetailVisible}
                onCancel={this.handleportalDetailCancel}
                footer={null}
                width = {1100} 
                destroyOnClose = {true}
            >
                <Tabs type="card">
                    <TabPane forceRender={true} tab="All in One" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="PM" key="2">
                        Content of PM
                    </TabPane>
                    <TabPane tab="TicketSheet" key="3">
                        Content of TicketSheet
                    </TabPane>
                    <TabPane tab="MCI" key="4">
                        Content of MCI
                    </TabPane>
                    <TabPane tab="Call" key="5">
                        Content of Call
                    </TabPane>
                </Tabs>
            </Modal>                
            <hr />
{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BAU  Management!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <Divider >
                <h3 style={{fontFamily:"Times New Roman"}}><em><b> Task Information</b></em></h3>
            </Divider>
            <Row type="flex" justify="space-around" gutter={8}>
            <Col span={6}>               
            <Card type={'inner'} title="PM"  extra={<Button onClick={() => this.showModal('PM')} type="primary">More</Button>} hoverable >
                <Modal
                    title={this.state.BAUtitle}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width = {1100} 
                    destroyOnClose = {true}
                >
                    <p>Please Select Date Range </p>
                    <RangePicker disabledDate={disabledDate} onChange={this.onDateRangeChange} autoFocus = {true} allowClear={true}  style={{ width: '100%' }}/>
                    <hr/>
                    <p>Please Select a Agent / Agents Name </p>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please Select at Least Agent"
                        notFoundContent = 'SomeThing Worry , Please Contact Admin'
                        onChange={handleChange}
                        allowClear = {true}
                    >
                    {this.state.userValues.map (userValue => <Option value= {userValue.name} key={userValue.name}>{userValue.name}</Option>)}
                    </Select>   
                    <div style={this.state.showChart}><hr/>
                        <LineChart width={1050} height={400} data={this.state.chartData}>
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
                <p> PMs Completed Today :  <u><b></b></u></p>
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
                <p> Task Completed Today : <u><b>{this.state.BAUTaskNow.length}</b></u></p>
                <Divider />
                <p> Task Completed This Week : <u><b>{this.state.BAUTask7.length}</b></u></p>
                <Divider />
                <p> Task Completed This Month : <u><b>{this.state.BAUTask30.length}</b></u></p>
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
                    {this.state.pmRSPFollowUpValues.slice(0, 3).map(pmRSPFollowUpValue => <div key={pmRSPFollowUpValue.rsp}><p >{pmRSPFollowUpValue.rsp} : <a onClick={this.RSPFollowupMore}><b><u>{pmRSPFollowUpValue.numberOfrsp}</u></b></a></p><hr/></div>)}
                    </Card>
                    <Modal
                        title={this.state.pmTitle}
                        visible={this.state.pmVisible}
                        onCancel={this.handlePMCancel}
                        width = {1100}
                        footer={null}
                        destroyOnClose = {true}
                        >
                        <Select defaultValue="0"  size={'large'} style={{ width: '100%' }} autoFocus = {true} allowClear={true} onChange={this.pmQueryChange}>
                        <Option value="0" disabled>---  Select {this.state.pmTitle} ---</Option>
                        {
                            this.state.pmTitle === 'RSP' ? 
                            this.state.pmRSPValues.map (pmRSPValue => <Option value= {pmRSPValue.rsp} key={pmRSPValue.rsp}>{pmRSPValue.rsp}</Option>) : 
                                [ this.state.pmTitle === 'Internal Agent' ?
                                this.state.pmInternalValues.map (pmInternalValue => <Option value= {pmInternalValue.dsName}  key={pmInternalValue.dsName}>{pmInternalValue.dsName}</Option>) :
                                this.state.pmSercoValues.map (pmSercoValue => <Option key={pmSercoValue.name} value= {pmSercoValue.name}>{pmSercoValue.name}</Option>)
                                ]
                        }
                        </Select>
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
                        extra={<Badge count={this.state.pmExpiredValue.length}  showZero ={true} onClick={() => this.showExpiredModal('Expired Orders')}/>}
                        style={{ width: 330 }}
                        // actions={[<Icon style={{fontSize: 18}} type="share-alt" />, <Icon style={{fontSize: 18}} type="edit" />]}
                        loading = {this.state.pmLoading}
                        hoverable>
                        {this.state.pmExpiredValue.slice(0, 3).map(pmExpiredValu => 
                            <div key = {pmExpiredValu.portalID+pmExpiredValu.taskType+pmExpiredValu.followDate}>
                                <ul>
                                    <li>Portal ID : {pmExpiredValu.portalID} </li>
                                    <li>PM Task Type : {pmExpiredValu.taskType} </li>
                                    <li>Follow Up from : {pmExpiredValu.followUp} </li>
                                    <li>Expired On : 
                                        <span style={{visibility: 'visible'}} id={pmExpiredValu.portalID+pmExpiredValu.taskType+pmExpiredValu.followDate}>
                                            <b>{pmExpiredValu.followDate}</b>
                                            <Popconfirm title="Are you sure you want to reschedule this PM Order?" 
                                                onConfirm={()=> this.pmRescehdule(pmExpiredValu.portalID,pmExpiredValu.taskType,pmExpiredValu.followDate)} 
                                                okText="Yes" 
                                                cancelText="No"
                                            >
                                            <a> <Icon type="calendar"/></a> 
                                            </Popconfirm>
                                        </span>
                                    </li>                                  
                                </ul>
                                <hr/>
                            </div>
                        )}
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
                            pagination={{ pageSize: 10}} 
                            columns={columns}
                            rowSelection={rowSelection}
                            //expandRowByClick = "true"
                            dataSource={this.state.pmExpiredValue}
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
                        title="Expire in 8 Hours"  
                        extra={<Badge count={this.state.pmExpirein8Value.length}  showZero ={true} onClick={() => this.showExpiredModal('Expire in 8 Hours')}/>}
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
                        title="Expire in 24 Hours"  
                        extra={<Badge count={this.state.pmExpirein24Value.length}  showZero ={true}  onClick={() => this.showExpiredModal('Expired in 24 Hours')}/>}
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

            <Divider ><h3 style={{fontFamily:"Times New Roman"}}><em><b>Achived Management</b></em></h3></Divider>
            <br/>                  
            <br/>                  
            <br/>                  
            <br/>                  
            <br/>                  
            <br/>                  
            <br/>                  
        </div>
      )
    }
  }

ReactDOM.render(<ManagerDashBoard />, document.getElementById('root'));
