import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, Typography, Input, Row, Col, Upload, Space, InputNumber, Button } from 'antd'
import { PageHeader, Breadcrumb, Notifications } from "../../../components";
import { IconUploadLg } from '../../../assets/images'
import "./style.scss";
import useRecipesHook from "../actionHandler";
import { useRecoilValue } from "recoil";
import { recipeState } from "../../../store";

const EditRecipe = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate =useNavigate()
  const params:any = useParams();
  const [form] = Form.useForm();
  const [modalRecipeDeleteOpen, setModalRecipeDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const {updateRecipe, getRecipe} = useRecipesHook()
  const recipe = useRecoilValue(recipeState)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getRecipe(params.recipeId)
  }, [])

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function submitUpdateRecipe(values:any) {
    const formData = new FormData();
    formData.append('recipeId', params.recipeId);
    formData.append('name', values.name);
    formData.append('image', values.image[0].originFileObj);
    formData.append('description', values.description);
    formData.append('ingredients', values.ingredients);
    formData.append('instructions', values.instructions);
    formData.append('kitcherGear', values.kitcherGear);
    formData.append('servings', values.servings);
    formData.append('prepTimeHours', values.prepTimeHours);
    formData.append('prepTimeMins', values.prepTimeMins);
    formData.append('cookTimeHours', values.cookTimeHours);
    formData.append('cookTimeMins', values.cookTimeMins);
    formData.append('status', status);
    setLoading(true)
    const response = await updateRecipe(formData);
    if(!response.error) {
      Notifications({title: "Success", description: response.message, type: 'success'});
    }
    setLoading(false);
    navigate(-1);
  }


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function normFile(e: any) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  const submitAsPublished = () => {
    console.log("submit")
    setStatus('published')
    form.submit()
  }

  const submitAsDraft = () => {
    setStatus('draft')
    form.submit()
  }

  const validateDescription = (_:any, value:any) => {
    if (value && value.length > 200) {
      return Promise.reject('The description must not exceed 200 characters.');
    }
    return Promise.resolve();
  };

  const validateUpload = (_:any, fileList:any) => {
    if (fileList.length !== 1) {
      return Promise.reject(new Error('Please upload only one image.'));
    }
    return Promise.resolve();
  };



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="add-new-recipe">
        <PageHeader
          title={
            <Breadcrumb 
              breadCrumbData={[
                { name: "Update Recipe" },
                { name: "Sticky Orange Chicken", onClickNavigateTo: -1 },
              ]}  
            />
          }
          bordered
        />

        <div className="add-recipe-card">
          <div className="add-recipe-card-header">
            <Typography.Title level={4}>Recipe Details</Typography.Title>
            <Typography.Paragraph>Set of instructions that will describe about your recipe to other people.</Typography.Paragraph>
          </div>
        
          <Form
            form={form}
            layout="vertical"
            name="editRecipe"
            requiredMark={false}
            initialValues={recipe}
            onValuesChange={(_, values) => {
              console.log('Bedroom values::: ', values)
            }}
            onFinish={submitUpdateRecipe}
          >
            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>Description</Typography.Title>
                  <Typography.Paragraph>Give your recipe a name and briefly tell us about it.</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input className="filled" placeholder="Enter name of the recipe" />
                  </Form.Item>

                  <Form.Item label="Add Image" name="image" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload an image' },{validator: validateUpload}]}>
                    <Upload.Dragger name="files" action="/upload.do" className="filled">
                      <div className="shs-drag-drop">
                        <div className="shs-upload-content">
                          <div className="shs-upload-text">Drag & drop files or <span>Browse</span></div>
                          <div className="shs-upload-hint">Support jpeg,pdf and doc files</div>
                        </div>
                        <div className="shs-upload-icon">
                          <IconUploadLg />
                        </div>
                      </div>
                    </Upload.Dragger>
                  </Form.Item>

                  <Form.Item name="description" label="Description" rules={[{ required: true }, { validator: validateDescription }]}>
                    <Input.TextArea 
                      className="filled" 
                      placeholder="Write the description of internship" 
                      autoSize={{minRows: 5, maxRows: 5}}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>How To Prepare</Typography.Title>
                  <Typography.Paragraph>Set of instructions needed to make the dish, including the quantity and measurement of each.</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Form.Item name="kitcherGear" label="Kitchen Gear">
                    <Input className="filled" placeholder="Add one or paste multiple items" />
                  </Form.Item>

                  <Form.Item name="ingredients" label="Ingredients">
                    <Input className="filled" placeholder="Add one or paste multiple items" />
                  </Form.Item>

                  <Form.Item name="instructions" label="Instructions">
                    <Input className="filled" placeholder="Enter one or steps" />
                  </Form.Item>

                  <Form.Item name="servings" label="Servings" rules={[{ required: true }]}>
                    <InputNumber min={1} className="filled" placeholder="Add servings" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>Preparation Time</Typography.Title>
                  <Typography.Paragraph>The amount of time it takes to prepare the ingredients, usually measured in minutes..</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Row gutter={20}>
                    <Col xs={12}>
                      <Form.Item name="prepTimeHours" label="Hours" rules={[{ required: true }]}>
                        <InputNumber min={0} className="filled" placeholder="Hours 0" />
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item name="prepTimeMins" label="Minutes" rules={[{ required: true }]}>
                        <InputNumber min={0} className="filled" placeholder="Minutes 0" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>Cook time</Typography.Title>
                  <Typography.Paragraph>The amount of time it takes to cook the dish, usually measured in minutes.</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Row gutter={20}>
                    <Col xs={12}>
                      <Form.Item name="cookTimeHours" label="Hours" rules={[{ required: true }]}>
                        <InputNumber min={0} className="filled" placeholder="Hours 0" />
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item name="cookTimeMins" label="Minutes" rules={[{ required: true }]}>
                        <InputNumber min={0} className="filled" placeholder="Minutes 0" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
          <div className="add-recipe-form-footer">
            <Space size={20}>
              <Button
                className="button-tertiary"
                type="link"
                loading={loading}
                onClick={() => submitAsDraft()}
              >
                Save Draft
              </Button>
              <Button className="button-tertiary" ghost onClick={() => navigate(-1)}>Cancel</Button>
              <Button 
                className="button-tertiary"
                loading={loading}
                onClick={() => submitAsPublished()}
              >
                Publish
              </Button>
            </Space>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default EditRecipe