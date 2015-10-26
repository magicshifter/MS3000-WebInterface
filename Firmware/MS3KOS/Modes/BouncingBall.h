#include <math.h>

//float PI = 3.1415;

/*
 float abs(float val)
{
  if (val < 0) return -val;
  return val;
}
//*/


class CircleBall
{
  public:
  float angle;
  float velocity;
  float radius;

  public:
  CircleBall(float r)
  {
    angle = .0;
    velocity = .0;
    radius = r;
  }

  float PI_HACK = 3.1415;

  float calX = 1;
  float calY = 0;

  void calibrate(float gx, float gy)
  {
      calX = gx;
      calY = gy;
  }

  void applyForce(float sec, float gx, float gy)
  {
    sec *= 0.5;
    float posx = cos(angle);
    float posy = sin(angle);

    float px = gx * calX + gy * calY;
    float py = gx * calY - gy * calX;
    float accel = -posy * px + posx * py;

    //float accel = -posy * gx + posx * gy;

    //accel = -accel;
    velocity += sec * accel;

    velocity *= 0.995;

    angle += sec * velocity / radius;
    while (angle < 0) angle += 2*PI_HACK;
    while (angle > 2*PI_HACK) angle -= 2*PI_HACK;
  }

  float pos = 0.5;
  float vel = 0;

  // void applyForceMB(float sec, float g)
  // {
  //   vel *= 0.99;
  //   vel += sec*g;
  //   pos += vel;

  //   if (pos < 0)
  //   {
  //     pos = 0;
  //     vel = -vel;
  //   }
  //   else if (pos > 1)
  //   {
  //     pos = 1;
  //     vel = -vel;
  //   }
  // }


  void applyForce(float sec, float g)
  {
    sec *= 0.5;

    angle += sec * g;
    while (angle < 0) angle += 2*PI_HACK;
    while (angle > 2*PI_HACK) angle -= 2*PI_HACK;
  }

  float getLedBright(int idx, int leds)
  {
    float pos = leds * angle / (2*PI_HACK);

    float delta = pos-idx;
    if (delta < 0) delta = -delta;

    if (delta < 1)
    {
      return 1 - delta;
    }

    return 0;
  }
};


class BouncingBallMode
{
  public:
  float pos = 0.5;
  float vel = 0;

  public:
  BouncingBallMode(float r)
  {
  }

  void flash(int start, int end)
  {
    int delta = 1;

    if (start > end)
    {
      delta = -1;
    }

    bool stopLoop = false;
    for (byte idx = start; !stopLoop ; idx += delta)
    {
      setPixel(idx, 255, 255, 255, msGlobals.GLOBAL_GS);
      updatePixels();
      delay(2);

      if (idx == end)
      {
        stopLoop = true;
      }
    }
  }

public:
  int allowFlashTimer = 0;
  bool allowFlash = false;
  bool smoothLanding = false;

  const float minFlashSpeed = 0.18;
  const float maxFlashLandingSpeed = 0.027;
  const float minFastPeriod = 0.00005;
  const float flashDifficulty = 1;

  void applyForce(float sec, float g)
  {
    g = -g;

    vel *= 0.9996;
    vel += sec*g*0.004;
    pos += vel*0.004;

    if (vel < (-minFlashSpeed*flashDifficulty) || vel > (minFlashSpeed*flashDifficulty))
    {
      //allowFlashTimer += sec;
      //if (allowFlashTimer > minFastPeriod)
        allowFlash = true;
    }
    else  
    {
      //allowFlashTimer -= sec;
      //if (allowFlashTimer < 0) allowFlashTimer = 0;
    }

    smoothLanding = vel < (maxFlashLandingSpeed/flashDifficulty) && vel > (-maxFlashLandingSpeed/flashDifficulty);

    if (pos < 0)
    {
      pos = 0;
      vel = -vel;

      if (allowFlash && smoothLanding)
      {
        flash(0, MAX_LEDS - 1);
        pos = 1;
        vel = 0;
      } 
      allowFlash = 0;
      allowFlashTimer = 0;
    }
    else if (pos > 1)
    {
      pos = 1;
      vel = -vel;

      if (allowFlash && smoothLanding)
      {
        flash(MAX_LEDS - 1, 0);
        pos = 0;
        vel = 0; 
      }
      allowFlash = 0;
      allowFlashTimer = 0;
    }
  }

  float getLedBright(int idx, int leds)
  {
    float scale = 1;
    float i = (leds-1) * pos; 

    if (i < 0) i = 0;
    if (i > leds-1) i = leds-1; 

    float delta = i-idx;
    if (delta < 0) delta = -delta;

    if (delta < 1)
    {
      return (1 - delta)* scale;
    }

    return 0;
  }
};