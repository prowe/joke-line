#!/bin/bash

set -e

PHONE_NUMBER_ID=$(aws cloudformation describe-stack-resource \
    --stack-name=prowe-joke-line \
    --logical-resource-id=PhoneNumber \
    --query=StackResourceDetail.PhysicalResourceId --output=text)
INSTANCE_ID=$(aws cloudformation describe-stack-resource \
    --stack-name=prowe-joke-line \
    --logical-resource-id=ConnectInstance \
    --query=StackResourceDetail.PhysicalResourceId --output=text)
MAIN_FLOW_ID=$(aws cloudformation describe-stack-resource \
    --stack-name=prowe-joke-line \
    --logical-resource-id=InboundFlow \
    --query=StackResourceDetail.PhysicalResourceId --output=text)

aws connect associate-phone-number-contact-flow \
    --phone-number-id=$PHONE_NUMBER_ID \
    --instance-id=$INSTANCE_ID \
    --contact-flow-id=$MAIN_FLOW_ID