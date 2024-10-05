class Boid {
    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.position = createVector(x, y);
        this.radius = 3.0;
        this.maxspeed = 3;    // Maximum speed
        this.maxforce = 0.05; // Maximum steering force
        this.desiredseparation = 30.0
    }

    run = (boids) => {
        this.flock(boids);
        this.update();
        this.wrapAround();
        this.render();
    }

    applyForce = (force) => this.acceleration.add(force);

    flock(boids) {
        let separation = this.separate(boids);   // Separation
        let alignment = this.align(boids);      // Alignment
        let cohesion = this.cohesion(boids);   // Cohesion
        
        // Arbitrarily weight these forces
        separation.mult(1.5);
        alignment.mult(1.0);
        cohesion.mult(1.0);
        
        // Add the force vectors to acceleration
        this.applyForce(separation);
        this.applyForce(alignment);
        this.applyForce(cohesion);
    }

    update() {
        this.updateVelocity()
        this.limitSpeed()
        this.applyVelocity();
        this.resetAcceleration()
    }

    applyVelocity = () => this.position.add(this.velocity);

    limitSpeed = () => this.velocity.limit(this.maxspeed);

    updateVelocity = () => this.velocity.add(this.acceleration);

    resetAcceleration =() => this.acceleration.mult(0);

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target
        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus Velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        return steer;
    }

    render() {
        // Draw a triangle rotated in the direction of velocity
        let theta = this.velocity.heading() + radians(90);
        fill(127);
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.radius * 2);
        vertex(-this.radius, this.radius * 2);
        vertex(this.radius, this.radius * 2);
        endShape(CLOSE);
        pop();
    }

    wrapAround() {
        if (this.position.x < -this.radius) 
            this.position.x = width + this.radius;
        if (this.position.y < -this.radius) 
            this.position.y = height + this.radius;
        if (this.position.x > width + this.radius) 
            this.position.x = -this.radius;
        if (this.position.y > height + this.radius) 
            this.position.y = -this.radius;
    }

    separate(boids) {
        let steer = createVector(0, 0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < boids.length; i++) {
            let distance = p5.Vector.dist(this.position, boids[i].position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((distance > 0) && (distance < this.desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(distance);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }
    
        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }

    align(boids) {
        let neighbordist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    cohesion(boids) {
        let neighbordist = 50;
        let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum);  // Steer towards the location
        } else {
            return createVector(0, 0);
        }
    }
}