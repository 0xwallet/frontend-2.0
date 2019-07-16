import React,{useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export default (props)=> {
    const { chartData, chartOpts, id, isOpen, name} = props;

    const [open,setOpen] = useState(isOpen);

    const icons = {
        'card1' : 'fa fa-bitcoin',
        'card2' : 'fa fa-dollar',
        'card3' : 'fa fa-yen',
        'card4' : 'fa fa-bitcoin'
    }

    return(
         <Card className={name} >
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id={id} isOpen={open} toggle={() => setOpen(!open)}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                {/* fa fa-bitcoin */}
                <div className="text-value"><i className={icons[id]}></i> 9.823</div>
                {/* cardID */}
                <div>0123 XXXX XXXX XXXX</div>
              </CardBody>
              <div className="chart-wrapper mt-3 mx-3" style={{ height: '70px' }}>
                <Bar data={chartData} options={chartOpts} height={70} />
              </div>
            </Card> 
    )
}