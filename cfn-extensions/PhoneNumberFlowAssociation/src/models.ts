// This is a generated file. Modifications will be overwritten.
import { BaseModel, Dict, integer, Integer, Optional, transformValue } from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import { Exclude, Expose, Type, Transform } from 'class-transformer';

export class ResourceModel extends BaseModel {
    ['constructor']: typeof ResourceModel;

    @Exclude()
    public static readonly TYPE_NAME: string = 'SourceAllies::Connect::PhoneNumberFlowAssociation';

    @Exclude()
    protected readonly IDENTIFIER_KEY_PHONENUMBERID: string = '/properties/PhoneNumberId';

    @Expose({ name: 'InstanceId' })
    @Transform(
        (value: any, obj: any) =>
            transformValue(String, 'instanceId', value, obj, []),
        {
            toClassOnly: true,
        }
    )
    instanceId?: Optional<string>;
    @Expose({ name: 'PhoneNumberId' })
    @Transform(
        (value: any, obj: any) =>
            transformValue(String, 'phoneNumberId', value, obj, []),
        {
            toClassOnly: true,
        }
    )
    phoneNumberId?: Optional<string>;
    @Expose({ name: 'ContactFlowId' })
    @Transform(
        (value: any, obj: any) =>
            transformValue(String, 'contactFlowId', value, obj, []),
        {
            toClassOnly: true,
        }
    )
    contactFlowId?: Optional<string>;

    @Exclude()
    public getPrimaryIdentifier(): Dict {
        const identifier: Dict = {};
        if (this.phoneNumberId != null) {
            identifier[this.IDENTIFIER_KEY_PHONENUMBERID] = this.phoneNumberId;
        }

        // only return the identifier if it can be used, i.e. if all components are present
        return Object.keys(identifier).length === 1 ? identifier : null;
    }

    @Exclude()
    public getAdditionalIdentifiers(): Array<Dict> {
        const identifiers: Array<Dict> = new Array<Dict>();
        // only return the identifiers if any can be used
        return identifiers.length === 0 ? null : identifiers;
    }
}

export class TypeConfigurationModel extends BaseModel {
    ['constructor']: typeof TypeConfigurationModel;



}

