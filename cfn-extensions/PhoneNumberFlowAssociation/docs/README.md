# SourceAllies::Connect::PhoneNumberFlowAssociation

Associates a phone number with a contact flow

## Syntax

To declare this entity in your AWS CloudFormation template, use the following syntax:

### JSON

<pre>
{
    "Type" : "SourceAllies::Connect::PhoneNumberFlowAssociation",
    "Properties" : {
        "<a href="#instanceid" title="InstanceId">InstanceId</a>" : <i>String</i>,
        "<a href="#phonenumberid" title="PhoneNumberId">PhoneNumberId</a>" : <i>String</i>,
        "<a href="#contactflowid" title="ContactFlowId">ContactFlowId</a>" : <i>String</i>
    }
}
</pre>

### YAML

<pre>
Type: SourceAllies::Connect::PhoneNumberFlowAssociation
Properties:
    <a href="#instanceid" title="InstanceId">InstanceId</a>: <i>String</i>
    <a href="#phonenumberid" title="PhoneNumberId">PhoneNumberId</a>: <i>String</i>
    <a href="#contactflowid" title="ContactFlowId">ContactFlowId</a>: <i>String</i>
</pre>

## Properties

#### InstanceId

ID of the instance

_Required_: Yes

_Type_: String

_Update requires_: [No interruption](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-no-interrupt)

#### PhoneNumberId

Id of the phone number

_Required_: Yes

_Type_: String

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### ContactFlowId

Id of the flow

_Required_: Yes

_Type_: String

_Update requires_: [No interruption](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-no-interrupt)

## Return Values

### Ref

When you pass the logical ID of this resource to the intrinsic `Ref` function, Ref returns the PhoneNumberId.
