import NavMenu from '../NavMenu';
import SysInfo from "../SysInfo";
import Notifications from "../notifications";
import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Drawer, Button, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default class Frame extends React.Component {
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
                            <div className="logo" ><h1>Logo</h1></div>
                            {/* <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                        </Menu> */}
                            <UserOutlined onClick={this.showDrawer} />
                        </Header>
                        <Layout>
                            <Drawer
                                title="Admission Male"
                                placement={placement}
                                closable={false}
                                onClose={this.onClose}
                                visible={visible}
                                key={placement}>                            <NavMenu {...this.props} />
                            </Drawer>
                            <Layout style={{ padding: '24px 24px 24px' }}>
                                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                    <Switch>
                                        <Route exact path="/" component={SysInfo}></Route>
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