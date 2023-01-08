import {
    Action,
    BaseResource,
    exceptions,
    handlerEvent,
    HandlerErrorCode,
    LoggerProxy,
    OperationStatus,
    Optional,
    ProgressEvent,
    ResourceHandlerRequest,
    SessionProxy,
} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import AWS from 'aws-sdk';
import { AssociatePhoneNumberContactFlowRequest, DisassociatePhoneNumberContactFlowRequest } from 'aws-sdk/clients/connect';
import { ResourceModel, TypeConfigurationModel } from './models';

interface CallbackContext extends Record<string, any> {}

class Resource extends BaseResource<ResourceModel> {

    /**
     * CloudFormation invokes this handler when the resource is initially created
     * during stack create operations.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param typeConfiguration Configuration data for this resource type, in the given account
     * and region
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.Create)
    public async create(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy,
        typeConfiguration: TypeConfigurationModel,
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        const model = new ResourceModel(request.desiredResourceState);
        const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>(model);
        try {
            const req: AssociatePhoneNumberContactFlowRequest = {
                InstanceId: model.instanceId,
                PhoneNumberId: model.phoneNumberId,
                ContactFlowId: model.contactFlowId
            };
            logger.log('Request: {}', req);
            const client = session.client<AWS.Connect>('Connect');
            await client.associatePhoneNumberContactFlow(req).promise();
            logger.log('Phone number associated');
            progress.status = OperationStatus.Success;
        } catch(err) {
            logger.log(err);
            // exceptions module lets CloudFormation know the type of failure that occurred
            throw new exceptions.InternalFailure(err.message);
            // this can also be done by returning a failed progress event
            // return ProgressEvent.failed(HandlerErrorCode.InternalFailure, err.message);
        }
        return progress;
    }

    /**
     * CloudFormation invokes this handler when the resource is deleted, either when
     * the resource is deleted from the stack as part of a stack update operation,
     * or the stack itself is deleted.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param typeConfiguration Configuration data for this resource type, in the given account
     * and region
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.Delete)
    public async delete(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy,
        typeConfiguration: TypeConfigurationModel,
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        try {
            const model = new ResourceModel(request.desiredResourceState);
            const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>();

            const req: DisassociatePhoneNumberContactFlowRequest = {
                InstanceId: model.instanceId,
                PhoneNumberId: model.phoneNumberId
            };
            logger.log('Request:', req);
            const client = session.client<AWS.Connect>('Connect');
            await client.disassociatePhoneNumberContactFlow(req).promise();
            logger.log('Phone number disassociated');
            progress.status = OperationStatus.Success;
            return progress;
        } catch (err) {
            logger.log(err);
            throw new exceptions.InternalFailure(err.message);
        }
    }

    /**
     * CloudFormation invokes this handler as part of a stack update operation when
     * detailed information about the resource's current state is required.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param typeConfiguration Configuration data for this resource type, in the given account
     * and region
     * @param logger Logger to proxy requests to default publishers
     */
     @handlerEvent(Action.Read)
     public async read(
         session: Optional<SessionProxy>,
         request: ResourceHandlerRequest<ResourceModel>,
         callbackContext: CallbackContext,
         logger: LoggerProxy,
         typeConfiguration: TypeConfigurationModel,
     ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
         const model = new ResourceModel(request.desiredResourceState);
         // TODO: put code here
         const progress = ProgressEvent.success<ProgressEvent<ResourceModel, CallbackContext>>(model);
         return progress;
     }
}

// @ts-ignore // if running against v1.0.1 or earlier of plugin the 5th argument is not known but best to ignored (runtime code may warn)
export const resource = new Resource(ResourceModel.TYPE_NAME, ResourceModel, null, null, TypeConfigurationModel)!;

// Entrypoint for production usage after registered in CloudFormation
export const entrypoint = resource.entrypoint;

// Entrypoint used for local testing
export const testEntrypoint = resource.testEntrypoint;
