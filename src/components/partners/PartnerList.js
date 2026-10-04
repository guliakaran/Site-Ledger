import React from 'react';
import { PartnerCard } from '../cards/PartnerCard';
import { EmptyState } from '../common/EmptyState';

export function PartnerList({ partners, metaById, onPressPartner, onAdd }) {
  if (!partners?.length) {
    return (
      <EmptyState
        icon="account-group-outline"
        title="No partners yet"
        actionLabel={onAdd ? 'Add partner' : undefined}
        onAction={onAdd}
      />
    );
  }
  return partners.map((partner) => (
    <PartnerCard
      key={partner.id}
      partner={partner}
      financials={metaById?.[partner.id]?.financials}
      projectCount={metaById?.[partner.id]?.projectCount || 0}
      onPress={() => onPressPartner(partner)}
    />
  ));
}
