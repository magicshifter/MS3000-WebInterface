{
  "nested": {
    "RGB": {
      "fields": {
        "R": {
          "rule": "required",
          "type": "int32",
          "id": 1,
          "options": {
            "default": 0
          }
        },
        "G": {
          "rule": "required",
          "type": "int32",
          "id": 2,
          "options": {
            "default": 0
          }
        },
        "B": {
          "rule": "required",
          "type": "int32",
          "id": 3,
          "options": {
            "default": 0
          }
        }
      }
    },
    "MS3KG": {
      "fields": {
        "current": {
          "rule": "required",
          "type": "Modes",
          "id": 2
        },
        "luckyNumber": {
          "rule": "required",
          "type": "int32",
          "id": 3
        }
      },
      "nested": {
        "Modes": {
          "fields": {
            "current": {
              "rule": "required",
              "type": "string",
              "id": 1
            }
          },
          "nested": {
            "MagicPOV": {
              "fields": {
                "name": {
                  "rule": "required",
                  "type": "string",
                  "id": 1,
                  "options": {
                    "default": "magic"
                  }
                }
              },
              "nested": {
                "User": {
                  "fields": {
                    "image": {
                      "rule": "required",
                      "type": "string",
                      "id": 2,
                      "options": {
                        "default": "ourlogo"
                      }
                    }
                  }
                }
              }
            },
            "Lighting": {
              "fields": {
                "name": {
                  "rule": "required",
                  "type": "string",
                  "id": 1,
                  "options": {
                    "default": "light"
                  }
                },
                "subMode": {
                  "rule": "required",
                  "type": "LightningMode",
                  "id": 2
                },
                "color_RGB": {
                  "rule": "required",
                  "type": "RGB",
                  "id": 3
                }
              },
              "nested": {
                "LightningMode": {
                  "values": {
                    "RAINBOW": 0,
                    "NORMAL": 1,
                    "SCANNER_RGB": 2,
                    "SCANNER_BW": 3
                  }
                }
              }
            },
            "Arpi": {
              "fields": {
                "name": {
                  "rule": "required",
                  "type": "string",
                  "id": 1,
                  "options": {
                    "default": "arpi"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}