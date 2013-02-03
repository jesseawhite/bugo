/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"0hm1Es4JMAXNJRoD_kLubunArxquV07P3dYNc2g"] forKey:@"ti.android.google.map.api.key"];
    [_property setObject:[NSNumber numberWithBool:[TiUtils boolValue:@"false"]] forKey:@"ti.android.debug"];

    return _property;
}
@end
