import React, { forwardRef, useMemo } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType
} from "react-native";
import { QuoteTemplate } from "../backend/quotes";
import CircularPhotoWithGlow from "./CircularPhotoWithGlow";
import DateBadge from "./DateBadge";
import { UserProfile } from "../backend/user";
import { getRandomQuote } from "../backend/quoteContent";

type Props = {
  template: QuoteTemplate;
  profile: UserProfile;
};

// Static mapping from template IDs to sample JPEGs provided in the project.
const templateImages: Record<string, ImageSourcePropType> = {
  tmpl_good_morning_1: require("../../Quote JPEGS/1.jpg"),
  tmpl_good_morning_2: require("../../Quote JPEGS/2.jpg"),
  tmpl_motivational_1: require("../../Quote JPEGS/3.jpg"),
  tmpl_motivational_2: require("../../Quote JPEGS/4.jpg"),
  tmpl_shayari_1: require("../../Quote JPEGS/5.jpg"),
  tmpl_shayari_2: require("../../Quote JPEGS/6.jpg"),
  tmpl_religious_1: require("../../Quote JPEGS/7.jpg"),
  tmpl_religious_2: require("../../Quote JPEGS/8.jpg"),
  tmpl_love_1: require("../../Quote JPEGS/9.jpg"),
  tmpl_love_2: require("../../Quote JPEGS/10.jpg"),
  tmpl_festival_1: require("../../Quote JPEGS/11.jpg"),
  tmpl_festival_2: require("../../Quote JPEGS/12.jpg")
};

const QuoteCard = forwardRef<View, Props>(({ template, profile }, ref) => {
  // Get random quote for primary category
  const quote = useMemo(() => {
    if (template.categories.length > 0) {
      return getRandomQuote(template.categories[0]);
    }
    return "जीवन सुंदर है।";
  }, [template.id]);

  // Load template image with fallback to gradient placeholder
  const getTemplateSource = () => {
    const mapped = templateImages[template.id];
    if (mapped) {
      return mapped;
    }
    const gradientSvg =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjcwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2YTBkYWQ7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjQyNDI0O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyNzAiIGhlaWdodD0iNDgwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";
    return { uri: gradientSvg };
  };

  return (
    <View
      ref={ref}
      style={styles.card}
      collapsable={false}
      accessibilityLabel="कोट कार्ड"
    >
      <ImageBackground
        source={getTemplateSource()}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Quote text - centered in middle area */}
        <View
          style={[
            styles.abs,
            {
              left: 20,
              right: 20,
              top: 200,
              height: 200,
              justifyContent: "center",
              alignItems: "center"
            }
          ]}
        >
          <Text
            style={styles.quoteText}
            numberOfLines={5}
            accessibilityLabel="उद्धरण"
          >
            {quote}
          </Text>
        </View>

        {profile.showDate && (
          <View style={styles.dateBadgeWrapper}>
            <DateBadge
              date={
                profile.dateOverride
                  ? new Date(profile.dateOverride)
                  : undefined
              }
            />
          </View>
        )}

        <View style={styles.nameWrapper}>
          <Text style={styles.nameText} numberOfLines={2}>
            {profile.name}
          </Text>
        </View>

        <View style={styles.photoWrapper}>
          <CircularPhotoWithGlow uri={profile.photoUri} />
        </View>
      </ImageBackground>
    </View>
  );
});

export default QuoteCard;

const styles = StyleSheet.create({
  card: {
    width: 270,
    height: 480,
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000"
  },
  background: {
    flex: 1
  },
  abs: {
    position: "absolute"
  },
  dateBadgeWrapper: {
    position: "absolute",
    top: 16,
    left: 16
  },
  nameWrapper: {
    position: "absolute",
    left: 96,
    right: 16,
    bottom: 32,
    justifyContent: "center"
  },
  photoWrapper: {
    position: "absolute",
    left: 16,
    bottom: 16
  },
  nameText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "NotoSansDevanagari"
  },
  quoteText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansDevanagari",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500"
  }
});


