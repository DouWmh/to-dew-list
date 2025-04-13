function settingsComponent(props) {
  return (
    <Page>
      <Section
        title="Your Grocery List">
        <TextInput
          label="Enter items (comma-separated)"
          settingsKey="groceryItems"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
