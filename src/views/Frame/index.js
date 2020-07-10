import NavMenu from '../NavMenu';
import SysInfo from "../SysInfo";
import Notifications from "../notifications";
import React from 'react'
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import { Drawer, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const { Header, Content } = Layout;

export default class Frame extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.login) {
            <Redirect to="/login" />
        }
    }
    state = { visible: false, placement: 'left' };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };

    render() {
        const { placement, visible } = this.state;

        return (
            <React.Fragment>

                {/* <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button> */}
                <BrowserRouter>
                    <Layout style={{ height: "100%" }}>
                        <Header className="header">
                            <div className="logo">
                                <img src="https://www.easyunime.com/media/institution/photo/2019/01/10/ALMAAREFA_UNIVERSITY.jpg.600x400_q85.jpg" id="icon" alt="MCST LOGO" />
                            </div>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined onClick={this.showDrawer} />} />
                        </Header>
                        <Layout>
                            <Drawer className="drawer"
                                title="Admission Male"
                                placement={placement}
                                closable={false}
                                onClose={this.onClose}
                                visible={visible}
                                key={placement}>    <NavMenu  {...this.props} closeDrawer={() => { this.setState({ visible: false }) }} />
                            </Drawer>
                            <Layout style={{ padding: '24px 24px 24px' }}>
                                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                    <Switch>
                                        <Route path="/dashboard" component={SysInfo}></Route>
                                        <Route path="/notifications" component={Notifications}></Route>
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>

                </BrowserRouter>

            </React.Fragment>

        );
    }
}