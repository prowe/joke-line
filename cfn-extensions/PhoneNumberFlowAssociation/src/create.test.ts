import { Action, BaseResourceHandlerRequest, HandlerRequest, OperationStatus, TestEvent  } from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import { expect, test, vi, MockedFunction } from 'vitest';
import { testEntrypoint } from './handlers';
import { ResourceModel, TypeConfigurationModel } from './models';

// WIP

vi.mock('aws-sdk');

test('creates the association', async () => {
    // const mockvi.fn();
    const request: HandlerRequest<ResourceModel> = {
        credentials: {},
        action: Action.Create,
        request: {
            clientRequestToken: "4b90a7e4-b790-456b-a937-0cfdfa211dfe",
            desiredResourceState: {
                
            },
            previousResourceState: null,
            logicalResourceIdentifier: null
       
        } as BaseResourceHandlerRequest<ResourceModel>,
        callbackContext: null
    }
    const progress = await testEntrypoint({
    }, {});

    expect(progress.status).toEqual(OperationStatus.Success);
});
