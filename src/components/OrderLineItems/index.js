import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';

import { ReusableStyles } from '..';

import { injectQuery } from '../../common/store/reduxApi';
import { displayM2o } from '../../common/utils/commonComponentLogic';

const HorizontalItem = ({children}) => {
    const rs = useStyleSheet(ReusableStyles)
    return <View style={rs.horizontalItem}>{children}</View>
}

export default ({ recordIds, orderId }) => {
    const { useQuery } = injectQuery('sale.order.line', {
        fields: [
            'id',
            'product_id',
            'product_uom_qty',
        ],
        domain: [['id', 'in', recordIds]],
        reduxNameSuffix: `,sale.order,${orderId}`,
    });
    const { data, isLoading, refetch } = useQuery();

    const styles = useStyleSheet(themedStyles)
    const rs = useStyleSheet(ReusableStyles)
    if(data?.records?.length){
        return (
            <ScrollView horizontal={true} style={styles.container}>
                {data?.records?.map((line_id, index) =><HorizontalItem>
                    <Text key={line_id.id}>{displayM2o(line_id.product_id)}:{line_id.product_uom_qty}</Text>
                </HorizontalItem>)}
            </ScrollView>
        );
    }else{
        return <View style={styles.placeholder}/>
    }
};

const themedStyles = StyleService.create({
  container: {
    margin: 5,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: 'color-info-100',
  },
  placeholder: {
    height: 40
  }
})
