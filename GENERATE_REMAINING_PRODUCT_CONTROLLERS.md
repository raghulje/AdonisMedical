# Remaining Product Controllers Generator

I need to create 5 more product controllers following the same pattern:

1. **fpdCArm** (FPD C-Arm)
   - Models: FpdCArmPageContent, FpdCArmImage, FpdCArmFeature, FpdCArmVariant
   - Display name: "FPD C-Arm"

2. **hfCArm1k** (1K*1K High End HF C-ARM)
   - Models: HfCArm1kPageContent, HfCArm1kImage, HfCArm1kFeature, HfCArm1kVariant
   - Display name: "1K*1K High End HF C-ARM"

3. **lineFrequency** (Line Frequency)
   - Models: LineFrequencyPageContent, LineFrequencyImage, LineFrequencyFeature, LineFrequencyVariant
   - Display name: "Line Frequency"

4. **digitalRadiography** (Digital Radiography)
   - Models: DigitalRadiographyPageContent, DigitalRadiographyImage, DigitalRadiographyFeature, DigitalRadiographyVariant
   - Display name: "Digital Radiography"

5. **dreamSeries** (Dream Series)
   - Models: DreamSeriesPageContent, DreamSeriesImage, DreamSeriesFeature, DreamSeriesVariant
   - Display name: "Dream Series"

All follow the same pattern as hfFixedController.js - I'll create them now.

