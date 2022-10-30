/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  FormGroup,
  Input,
  Alert,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { _getBarang } from "service/barang";
import { _createBarang } from "service/barang";
import { _updateBarang } from "service/barang";
import { _deleteBarang } from "service/barang";

const Barang = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isShowModal, setIsShowModal] = useState({ show: false, data: {} })
  const [isShowModalDelete, setIsShowModalDelete] = useState({ show: false, data: {} })
  const [dataGrid, setDataGrid] = useState(undefined)
  const [dataItem, setDataItem] = useState({})

  useEffect(() => {
    if (isLoading === true) {
      getDataGrid()
    }
  }, [isLoading])

  useEffect(() => {
    let timeout
    if (isSuccess) {
      timeout = setInterval(() => {
        setIsSuccess(false)
      }, 3000);
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isSuccess])

  const getDataGrid = async () => {
    const response = await _getBarang()
    if (response.status === 200) {
      setDataGrid(response.data.data)
      setIsLoading(false)
    }
  }

  const onChangeInput = (field, value) => {
    const newDataItem = {
      ...dataItem,
      [field]: value
    }
    setDataItem(newDataItem)
  }

  const onClickDelete = async (dataItem) => {
    const res = await _deleteBarang(dataItem)
    if (res.status === 200) setIsShowModalDelete({ show: false, data: {} })
    setIsLoading(true)
  }

  const onSubmit = async () => {
    let res
    if (dataItem.id === undefined) {
      res = await _createBarang(dataItem)
    } else {
      res = await _updateBarang(dataItem)
    }
    if (res.status === 200) setIsSuccess(true)
    setIsShowModal({ show: false, data: {} })
    setIsLoading(true)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <div>
          <Alert
            color="success"
            fade={true}
            isOpen={isSuccess}
          >
            Success submit <strong>{dataItem.nama_barang}</strong>!
          </Alert>
        </div>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Data Barang</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={() => {
                        setIsShowModal({ show: true, data: {} })
                        setDataItem({})
                      }}
                      size="sm"
                    >
                      + Create
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Jenis Barang</th>
                    <th scope="col">Stock Barang</th>
                    <th scope="col">Harga Beli</th>
                    <th scope="col">Harga Jual</th>
                    <th scope="col">Gambar Barang</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {dataGrid && dataGrid.sort(({ id: a }, { id: b }) => b - a).map(i => (
                    <tr key={i.id}>
                      <td>{i.nama_barang}</td>
                      <td>{i.deskripsi}</td>
                      <td>{i.jenis_barang}</td>
                      <td>{i.stok_barang}</td>
                      <td>{i.harga_beli}</td>
                      <td>{i.harga_jual}</td>
                      <td></td>

                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={(e) => {
                                setIsShowModal({ show: true, data: i })
                                setDataItem(i)
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => setIsShowModalDelete({ show: true, data: i })}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal
        className="modal-dialog-centered"
        isOpen={isShowModal.show}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Form Barang
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsShowModal({ show: false, data: {} })}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <FormGroup>
            <div>
              <label
                className="form-control-label"
                htmlFor="input-address"
              >
                Nama
              </label>
              <Input
                className="form-control-alternative"
                id="input-address"
                placeholder="Nama Barang"
                type="text"
                value={dataItem.nama_barang}
                onChange={(e) => onChangeInput("nama_barang", e.target.value)}
              />
            </div>
            <div>
              <label
                className="form-control-label mt-3"
                htmlFor="input-address"
              >
                Jenis
              </label>
              <Input
                className="form-control-alternative"
                id="input-address"
                placeholder="Jenis Barang"
                type="text"
                value={dataItem.jenis_barang}
                onChange={(e) => onChangeInput("jenis_barang", e.target.value)}
              />
            </div>
            <div>
              <label
                className="form-control-label mt-3"
                htmlFor="input-address"
              >
                Stok
              </label>
              <Input
                className="form-control-alternative"
                id="input-address"
                placeholder="Stok Barang"
                type="number"
                field="stok_barang"
                value={dataItem.stok_barang}
                onChange={(e) => onChangeInput("stok_barang", e.target.value)}
              />
            </div>
            <div>
              <Row>
                <Col>
                  <label
                    className="form-control-label mt-3"
                    htmlFor="input-address"
                  >
                    Harga Jual
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-address"
                    placeholder="Rp."
                    type="number"
                    field="harga_jual"
                    value={dataItem.harga_jual}
                    onChange={(e) => onChangeInput("harga_jual", e.target.value)}
                  />
                </Col>
                <Col>
                  <label
                    className="form-control-label mt-3"
                    htmlFor="input-address"
                  >
                    Harga Beli
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-address"
                    placeholder="Rp."
                    type="number"
                    field="harga_beli"
                    value={dataItem.harga_beli}
                    onChange={(e) => onChangeInput("harga_beli", e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div>
              <label
                className="form-control-label mt-3"
                htmlFor="input-address"
              >
                Deskripsi
              </label>
              <Input
                className="form-control-alternative"
                placeholder="Deskripsi barang"
                rows="4"
                type="textarea"
                field="deskripsi"
                value={dataItem.deskripsi}
                onChange={(e) => onChangeInput("deskripsi", e.target.value)}
              />
            </div>
          </FormGroup>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => {
              setIsShowModal({ show: false, data: {} })
            }}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() => onSubmit()}>
            Save changes
          </Button>
        </div>
      </Modal>
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={isShowModalDelete.show}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-notification">
            Your attention is required
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsShowModalDelete({ show: false, data: {} })}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            <h4 className="heading mt-4">You should read this!</h4>
            <p>
              Are you sure to delete <strong>{isShowModalDelete.data.nama_barang}</strong>
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button className="btn-white" color="default" type="button"
            onClick={() => setIsShowModalDelete({ show: false, data: {} })}
          >
            Close
          </Button>
          <Button
            className="text-white ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => onClickDelete(isShowModalDelete.data)}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Barang;
